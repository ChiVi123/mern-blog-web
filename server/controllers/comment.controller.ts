import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Comment from "~models/comment.model";
import { IUserEntity } from "~types";
import { getErrorHandler } from "~utils";

interface ICommentRequest extends Request {
    user: jwt.JwtPayload & IUserEntity & { id: string };
}

export const createComment: RequestHandler = async (req, res, next) => {
    const { postId, userId, content } = req.body;
    const user = (req as unknown as ICommentRequest)?.user;

    if (userId !== user.id) {
        next(getErrorHandler(403, "You are not allowed to create this comment"));
    }

    const newComment = new Comment({
        postId,
        userId,
        content,
    });

    try {
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};
export const listPostComment: RequestHandler = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
export const likeComment: RequestHandler = async (req, res, next) => {
    const user = (req as unknown as ICommentRequest)?.user;

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(getErrorHandler(404, "Comment not found"));
        }
        const userIndex = comment.likes.indexOf(user.id);
        if (userIndex === -1) {
            comment.likes.push(user.id);
            comment.numberOfLikes += 1;
        } else {
            comment.likes.splice(userIndex, 1);
            comment.numberOfLikes -= 1;
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};
export const editComment: RequestHandler = async (req, res, next) => {
    const user = (req as unknown as ICommentRequest)?.user;

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(getErrorHandler(404, "Comment not found"));
        }
        if (comment.userId !== user.id && !user.isAdmin) {
            return next(getErrorHandler(403, "You are not allowed to edit this comment"));
        }

        const editComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content,
            },
            { new: true }
        );
        res.status(200).json(editComment);
    } catch (error) {
        next(error);
    }
};
export const deleteComment: RequestHandler = async (req, res, next) => {
    const user = (req as unknown as ICommentRequest)?.user;

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(getErrorHandler(404, "Comment not found"));
        }
        if (comment.userId !== user.id && !user.isAdmin) {
            return next(getErrorHandler(403, "You are not allowed to delete this comment"));
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json("Comment has been deleted");
    } catch (error) {
        next(error);
    }
};
