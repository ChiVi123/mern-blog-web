import "dotenv-expand/config";
import "dotenv/config";
import express, { Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route";

// Valid process env is here

mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log(error));

const app = express();

// config
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// middleware
app.use((err: Error, _req: any, res: Response, _next: any) => {
    const statusCode = "statusCode" in err && typeof err.statusCode === "number" ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
