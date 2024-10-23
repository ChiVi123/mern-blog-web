import mongoose from "mongoose";
import { IUserDocument } from "~types";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
