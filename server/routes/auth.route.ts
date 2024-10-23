import express from "express";
import { signIn, signup } from "~controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/sign-in", signIn);

export default authRoutes;
