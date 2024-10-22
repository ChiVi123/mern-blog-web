import bcryptjs from "bcryptjs";
import { RequestHandler } from "express";
import User from "../models/user.model";

export const signup: RequestHandler = async (req, res) => {
    const { username, email, password } = req.body as Partial<{ username: string; email: string; password: string }>;

    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.json({ message: "signup success" });
    } catch (error) {
        if (error !== null && typeof error === "object" && "message" in error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: error });
        }
    }
};
