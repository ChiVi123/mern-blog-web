import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

// Valid process env is here

mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => console.log(error));

const app = express();

app.listen(3002, () => {
    console.log("Server is running on port 3002!!!");
});
