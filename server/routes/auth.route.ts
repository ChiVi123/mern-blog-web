import express from "express";
import { google, signIn, signOut, signup } from "~controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/sign-out", signOut);
authRoutes.post("/google", google);

export default authRoutes;
