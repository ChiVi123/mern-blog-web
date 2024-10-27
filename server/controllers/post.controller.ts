import { Request, RequestHandler } from "express";
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

export const getList: RequestHandler = async (req, res, next) => {
    const startIndex = parseInt(req.query.start_index as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortDirection = (req.query.order as "asc" | "desc") === "asc" ? 1 : -1;

    try {
        const posts = await Post.find({
            ...(req.query.user_id && { userId: req.query.user_id }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.post_id && { _id: req.query.post_id }),
            ...(req.query.search_term && {
                $or: [{ title: { $regex: req.query.search_term, $options: "i" } }, { content: { $regex: req.query.search_term, $options: "i" } }],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const total = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        res.status(200).json({ posts, total, lastMonthPosts });
    } catch (error) {
        next(error);
    }
};
export const deletePost: RequestHandler = async (req, res, next) => {
    const user = (req as unknown as IUserRequest)?.user;

    if (user.id !== (req.params as { userId: string }).userId) {
        return next(getErrorHandler(403, "You are not allowed to updated a post"));
    }

    if (!user.isAdmin) {
        return next(getErrorHandler(403, "You are not allowed to updated a post"));
    }

    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};
