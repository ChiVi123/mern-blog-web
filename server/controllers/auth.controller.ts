import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import envConfig from "~config/env";
import { Controller, Route } from "~decorator";
import User from "~models/user.model";
import { IUserEntity } from "~types";
import { getErrorHandler } from "~utils";

interface IDataGoogleRequest {
    email: string;
    name: string;
    googlePhotoUrl: string;
}

@Controller("/api/auth")
class AuthController {
    @Route("post", "/sign-up")
    async signup(req: Request, res: Response, next: NextFunction) {
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
    }

    @Route("post", "/sign-in")
    async signIn(req: Request, res: Response, next: NextFunction) {
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

            const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, envConfig.JWT_SECRET_KEY);
            const { password: _password, ...rest } = validUser._doc;

            res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
        } catch (error) {
            next(error);
        }
    }

    @Route("post", "/google")
    async google(req: Request, res: Response, next: NextFunction) {
        const { email, name, googlePhotoUrl } = req.body as IDataGoogleRequest;

        try {
            const user = await User.findOne({ email });
            if (user) {
                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, envConfig.JWT_SECRET_KEY);
                const { password, ...rest } = user._doc;
                res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
            } else {
                const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
                const newUser = new User({
                    username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                    email,
                    password: hashedPassword,
                    profilePicture: googlePhotoUrl,
                });

                await newUser.save();

                const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, envConfig.JWT_SECRET_KEY);
                const { password, ...rest } = newUser._doc;

                res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
            }
        } catch (error) {
            next(error);
        }
    }

    @Route("post", "/sign-out")
    async signOut(_: any, res: Response, next: NextFunction) {
        try {
            res.clearCookie("access_token").status(200).json("User has been signed out");
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
