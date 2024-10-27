import express from "express";
import { create, getList } from "~controllers/post.controller";
import { verifyToken } from "~utils";

const postRoutes = express.Router();

postRoutes.get("/", getList);
postRoutes.post("/create", verifyToken, create);

export default postRoutes;
