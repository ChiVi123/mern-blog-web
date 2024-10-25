import express from "express";
import { deleteUser, updateUser } from "~controllers/user.controller";
import { verifyToken } from "~utils";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);

export default userRoutes;
