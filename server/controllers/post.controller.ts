import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import Post from "~models/post.model";
import { IUserEntity } from "~types";
import { getErrorHandler } from "~utils";

interface IUserRequest extends Request {
    user: jwt.JwtPayload & IUserEntity & { id: string };
}

export const create: RequestHandler = async (req, res, next) => {
    const user = (req as unknown as IUserRequest)?.user;

    if (!user.isAdmin) {
        return next(getErrorHandler(403, "You are not allowed to create a post"));
    }

    if (!req.body.title || !req.body.content) {
        return next(getErrorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
        ...req.body,
        userId: user.id,
        slug,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};
