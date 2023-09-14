import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
        type: String,
        required: true,
        default: "https://images.assetsdelivery.com/compings_v2/salamatik/salamatik1801/salamatik180100019.jpg"
    }
}, {
    timestamps: true,
})
// userModel.methods.matchPassword = async function (enteredPassword) {
//     console.log(enteredPassword)
//     const result = await bcrypt.compare(enteredPassword, this.password);
//     console.log("result", result, this.password, enteredPassword);
//     return result;
// }


// userModel.pre("save", async function (next) {
//     if (!this.modified) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = bcrypt.hash(this.password, salt);
// })


const User = mongoose.model("User", userModel);
export default User;