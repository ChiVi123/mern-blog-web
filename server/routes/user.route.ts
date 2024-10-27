import express from "express";
import { deleteUser, updateUser, userInfo, userList } from "~controllers/user.controller";
import { verifyToken } from "~utils";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);
userRoutes.get("/", verifyToken, userList);
userRoutes.get("/:userId", userInfo);

export default userRoutes;
