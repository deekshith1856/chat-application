import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";

function validateToken(req, res, next) {
    console.log('req.nody', req.rawHeaders[1]);
    // const header = req.body.headers['Authorization'];
    const header = req.rawHeaders[1];
    const token = header.split(" ")[1];
    if (!token) {
        res.status(400).json({ message: "token not present" })
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" })
        }
        req.user = await User.findById(decoded.id).select('-password');

        next();
    })
}
export default validateToken;