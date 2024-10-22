import express from "express";
import { signup } from "~controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);

export default authRoutes;
