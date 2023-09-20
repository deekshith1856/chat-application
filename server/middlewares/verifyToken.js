import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

function validateToken(req, res, next) {
    // const header = req.body.headers['Authorization'];

    const header = req.headers.authorization;

    if (!header) {
        res.status(400).json({ message: "token not present" })
    }

    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" })
        }
        req.user = await User.findById(decoded.id).select('-password');

        next();
    })
}
export default validateToken;