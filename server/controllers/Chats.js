import asychandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';

const fetchChats = asychandler(async (req, res, next) => {
    try {
        Chat.find({ users: req.user._id }).populate("users", "-password")
            .populate('groupAdmin', "-password")
            .populate('latestMessage')
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: 'name  pic email'
                });
                res.status(200).send(results);
            })
    } catch (error) {
        res.status(400).json({ message: error })
        console.log(error)
    }
})
const accessChat = asychandler(async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) { res.status(404).json({ message: 'user id required' }) };

    let data = await Chat.find({
        isGroupChat: false, $and: [{ users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } }]
    })
        .populate('users', '-password')
        .populate('latestMessage');
    data = await User.populate(data, {
        path: "latestMessage.sender",
        select: "name pic email",
    })
    if (data.length > 0) {
        res.send(data[0]);
    }
    else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
}
)
const createGroupChat = asychandler(async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "please fill all the fields" })
    }
    let users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).json({ message: 'More than 2 users required to form a group' })
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })
        const data = await Chat.findById(groupChat._id)
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }
})
const removeFromGroup = asychandler(async (req, res, next) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
})
const renameGroup = asychandler(async (req, res, next) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
})
const addToGroup = asychandler(async (req, res, next) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
})

export { fetchChats, accessChat, createGroupChat, renameGroup, removeFromGroup, addToGroup }