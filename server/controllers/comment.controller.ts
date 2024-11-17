import { NextFunction, Request, Response } from "express";

import { Controller, Route } from "~decorator";
import { verifyToken } from "~middleware";
import Comment from "~models/comment.model";
import { getErrorHandler } from "~utils";

@Controller("/api/comment")
class CommentController {
    @Route("post", "/create", verifyToken)
    async create(req: Request, res: Response, next: NextFunction) {
        const { postId, userId, content } = req.body;
        const user = req.user!;

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
    }

    @Route("get", "/:postId")
    async listPost(req: Request, res: Response, next: NextFunction) {
        try {
            const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
            res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }

    @Route("put", "/like:id", verifyToken)
    async likeComment(req: Request, res: Response, next: NextFunction) {
        const user = req.user!;

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
    }

    @Route("put", "/edit/:commentId", verifyToken)
    async edit(req: Request, res: Response, next: NextFunction) {
        const user = req.user!;

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
    }

    @Route("delete", "/delete/:commentId", verifyToken)
    async delete(req: Request, res: Response, next: NextFunction) {
        const user = req.user!;

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
    }

    @Route("get", "/", verifyToken)
    async queryComment(req: Request, res: Response, next: NextFunction) {
        const user = req.user!;

        if (!user.isAdmin) {
            return next(getErrorHandler(403, "You are not allowed to get all comments"));
        }

        const startIndex = parseInt(req.query.start_index as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;
        const sortDirection = req.query.sort === "desc" ? -1 : 1;
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        try {
            const comments = await Comment.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit).populate("userId").populate("postId");
            const total = await Comment.countDocuments();
            const lastMonthComments = await Comment.countDocuments({
                createdAt: { $gte: oneMonthAgo },
            });
            res.status(200).json({ comments, total, lastMonthComments });
        } catch (error) {
            next(error);
        }
    }
}

export default CommentController;
