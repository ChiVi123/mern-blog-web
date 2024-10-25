import express from "express";
import { updateUser } from "~controllers/user.controller";
import { verifyToken } from "~utils";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", verifyToken, updateUser);

export default userRoutes;
