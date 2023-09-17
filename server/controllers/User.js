import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../config/generateToken.js'
import bcrypt from 'bcryptjs'

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields")
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User with this email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name, email, password: hashedPassword, pic
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error("User not created")
    }
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {

        const validatePassword = async (password) => {
            const result = await bcrypt.compare(password, user.password);
            return result
        }
        if (validatePassword(password)) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400);
            throw new Error("Wrong password");
        }

    }
    else {
        res.status(400);
        throw new Error("Failed to login try again")
    }
})

const autoLogin = asyncHandler(async (req, res, next) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        })
    }
    else {
        res.status(400).json({ message: "user doesn't exist" });
    }
})
const getAllUsers = asyncHandler(async (req, res, next) => {
    const data = await User.find();
    res.status(200).send(data);

})

export { registerUser, loginUser, autoLogin, getAllUsers };