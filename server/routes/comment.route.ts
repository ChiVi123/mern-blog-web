import express from "express";
import { createComment, deleteComment, editComment, likeComment, listPostComment } from "~controllers/comment.controller";
import { verifyToken } from "~utils";

const commentRoutes = express.Router();

commentRoutes.post("/create", verifyToken, createComment);
commentRoutes.get("/:postId", listPostComment);
commentRoutes.put("/like/:commentId", verifyToken, likeComment);
commentRoutes.put("/edit/:commentId", verifyToken, editComment);
commentRoutes.delete("/delete/:commentId", verifyToken, deleteComment);

export default commentRoutes;
