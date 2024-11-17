import "dotenv/config";
import mongoose from "mongoose";
import { z } from "zod";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const MONGO_USER = process.env.MONGO_USER ?? "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? "";
const MONGO_URL = process.env.MONGO_URL ?? "";
const MONGO_DATABASE = process.env.MONGO_DATABASE ?? "";
const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, w: "majority" };

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME ?? "localhost";
const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;

const MongooseConnectOptionsSchema: z.ZodType<mongoose.ConnectOptions> = z.any();
const envConfigSchema = z.object({
    ENV_DEVELOPMENT: z.boolean(),
    ENV_TEST: z.boolean(),

    JWT_SECRET_KEY: z.string(),

    MONGO_USER: z.string(),
    MONGO_PASSWORD: z.string(),
    MONGO_URL: z.string(),
    MONGO_DATABASE: z.string(),
    MONGO_OPTIONS: MongooseConnectOptionsSchema,
    MONGO_CONNECTION: z.string(),

    SERVER_HOSTNAME: z.string(),
    SERVER_PORT: z.number(),
});

const envConfig = envConfigSchema.parse({
    ENV_DEVELOPMENT: process.env.NODE_ENV === "development",
    ENV_TEST: process.env.NODE_ENV === "test",

    JWT_SECRET_KEY,

    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_URL,
    MONGO_DATABASE,
    MONGO_OPTIONS,
    MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`,

    SERVER_HOSTNAME,
    SERVER_PORT,
});

export default envConfig;
