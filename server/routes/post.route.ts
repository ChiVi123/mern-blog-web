import express from "express";
import { create } from "~controllers/post.controller";
import { verifyToken } from "~utils";

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, create);

export default postRoutes;
