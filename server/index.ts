import "dotenv-expand/config";
import "dotenv/config";
import "reflect-metadata";

import cookieParser from "cookie-parser";
import express, { Response } from "express";
import mongoose from "mongoose";
import path from "path";

import envConfig from "~config/env";
import { AuthController, CommentController, PostController, UserController } from "~controllers";
import { defineRoutes } from "~core";

const rootDir = path.resolve();

// Valid process env is here

mongoose
    .connect(envConfig.MONGO_CONNECTION, envConfig.MONGO_OPTIONS)
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log(error));

const app = express();

// config
app.use(express.json());
app.use(cookieParser());

// routes
defineRoutes([AuthController, CommentController, PostController, UserController], app);

// file front end
app.use(express.static(path.join(rootDir, "user-client", "dist")));
app.get("*", (_req, res) => {
    res.sendFile(path.join(rootDir, "user-client", "dist", "index.html"));
});

// middleware
app.use((err: Error, _req: any, res: Response, _next: any) => {
    const statusCode = "statusCode" in err && typeof err.statusCode === "number" ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(envConfig.SERVER_PORT, () => {
    console.log(`Server is running on port ${envConfig.SERVER_PORT}`);
});
