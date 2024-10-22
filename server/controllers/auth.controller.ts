import bcryptjs from "bcryptjs";
import { RequestHandler } from "express";
import User from "../models/user.model";
import { getErrorHandler } from "../utils/error";

export const signup: RequestHandler = async (req, res, next) => {
    const { username, email, password } = req.body as Partial<{ username: string; email: string; password: string }>;

    if (!username || !email || !password) {
        next(getErrorHandler(400, "All fields are required"));
        return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.json({ message: "signup success" });
    } catch (error) {
        next(error);
    }
};
