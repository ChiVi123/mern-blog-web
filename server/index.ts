import "dotenv-expand/config";
import "dotenv/config";

import cookieParser from "cookie-parser";
import express, { Response } from "express";
import mongoose from "mongoose";
import path from "path";

import { authRoutes, commentRoutes, postRoutes, userRoutes } from "~routes";

const rootDir = path.resolve();

// Valid process env is here

mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log(error));

const app = express();

// config
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

// file front end
app.use(express.static(path.join(rootDir, "user-client", "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(rootDir, "user-client", "dist", "index.html"));
});

// middleware
app.use((err: Error, _req: any, res: Response, _next: any) => {
    const statusCode = "statusCode" in err && typeof err.statusCode === "number" ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
