import bcryptjs from "bcryptjs";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

import { Controller, Route } from "~decorator";
import { verifyToken } from "~middleware";
import User from "~models/user.model";
import { IUserEntity } from "~types";
import { getErrorHandler } from "~utils";

interface IUserRequest extends Request {
    user: jwt.JwtPayload & IUserEntity & { id: string };
}

export const userInfo: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(getErrorHandler(404, "User not found"));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

@Controller("/api/user")
class UserController {
    @Route("put", "/update/:userId", verifyToken)
    async updateUser(req: Request, res: Response, next: NextFunction) {
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
    }

    @Route("delete", "/delete/:userId", verifyToken)
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const user = (req as unknown as IUserRequest)?.user;

        if (!user.isAdmin && user.id !== (req.params as { userId: string }).userId) {
            return next(getErrorHandler(403, "You are not allowed to updated this user"));
        }

        try {
            await User.findByIdAndDelete((req.params as { userId: string }).userId);
            res.status(200).json("User has been deleted");
        } catch (error) {
            next(error);
        }
    }

    @Route("get", "/", verifyToken)
    async userList(req: Request, res: Response, next: NextFunction) {
        const user = (req as unknown as IUserRequest)?.user;

        if (!user.isAdmin) {
            return next(getErrorHandler(403, "You are not allowed to updated a post"));
        }

        const startIndex = parseInt(req.query.start_index as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;
        const sortDirection = (req.query.order as "asc" | "desc") === "asc" ? 1 : -1;

        try {
            const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

            const usersWithoutPassword = users.map((user) => {
                const { password, ...rest } = user._doc;
                return rest;
            });

            const totalUsers = await User.countDocuments();
            const now = new Date();
            const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

            const lastMonthUsers = await User.countDocuments({
                createdAt: { $gte: oneMonthAgo },
            });

            res.status(200).json({
                users: usersWithoutPassword,
                totalUsers,
                lastMonthUsers,
            });
        } catch (error) {
            next(error);
        }
    }

    @Route("get", "/:userId")
    async userInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return next(getErrorHandler(404, "User not found"));
            }
            const { password, ...rest } = user._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
