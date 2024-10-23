import express from "express";
import { google, signIn, signup } from "~controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/google", google);

export default authRoutes;
