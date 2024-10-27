import express from "express";
import { create, deletePost, getList } from "~controllers/post.controller";
import { verifyToken } from "~utils";

const postRoutes = express.Router();

postRoutes.get("/", getList);
postRoutes.post("/create", verifyToken, create);
postRoutes.delete("/delete/:id", verifyToken, deletePost);

export default postRoutes;
