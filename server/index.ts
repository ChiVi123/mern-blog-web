import "dotenv-expand/config";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route";

// Valid process env is here

mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
