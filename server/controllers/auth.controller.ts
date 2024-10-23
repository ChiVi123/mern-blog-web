import bcryptjs from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "~models/user.model";
import { IUserEntity } from "~types";
import { getErrorHandler } from "~utils";

export const signup: RequestHandler = async (req, res, next) => {
    const { username, email, password } = req.body as Partial<IUserEntity>;

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
export const signIn: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body as IUserEntity;

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            next(getErrorHandler(404, "User not found"));
            return;
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password!);
        if (!validPassword) {
            next(getErrorHandler(400, "Invalid password"));
            return;
        }

        const token = jwt.sign({ id: validUser._id }, String(process.env.JWT_SECRET));
        const { password: _password, ...rest } = validUser._doc;

        res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }
};
