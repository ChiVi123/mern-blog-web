import express from "express";
import { create, deletePost, getList, updatePost } from "~controllers/post.controller";
import { verifyToken } from "~utils";

const postRoutes = express.Router();

postRoutes.get("/", getList);
postRoutes.post("/create", verifyToken, create);
postRoutes.delete("/delete/:postId/:userId", verifyToken, deletePost);
postRoutes.put("/update/:postId/:userId", verifyToken, updatePost);

export default postRoutes;
