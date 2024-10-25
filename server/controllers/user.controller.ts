import bcryptjs from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import User from "~models/user.model";
import { IUserEntity } from "~types";
import { getErrorHandler } from "~utils";

interface IUserRequest extends Request {
    user: jwt.JwtPayload & { id: string };
}
export const updateUser: RequestHandler = async (req, res, next) => {
    const user = (req as unknown as IUserRequest)?.user;

    if (user.id !== (req.params as { userId: string }).userId) {
        return next(getErrorHandler(403, "You are not allowed to updated this user"));
    }

    const body = req.body as IUserEntity;

    if (body.password) {
        if (body.password.length < 0) {
            return next(getErrorHandler(400, "Password must be at least 6 characters"));
        }

        body.password = bcryptjs.hashSync(body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(getErrorHandler(400, "Username must be between 7 and 20 characters"));
        }
        if (req.body.username.includes(" ")) {
            return next(getErrorHandler(400, "Username cannot contain spaces"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(getErrorHandler(400, "Username must be lowercase"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(getErrorHandler(400, "Username can only contain letters and numbers"));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            next(getErrorHandler(404, "User not found"));
            return;
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
