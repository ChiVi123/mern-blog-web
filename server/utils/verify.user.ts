import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { getErrorHandler } from "./error";

interface IUserRequest extends Request {
    user: string | jwt.JwtPayload | undefined;
}

export const verifyToken: RequestHandler = async (req, _res, next) => {
    const token: string = req.cookies.access_token;

    if (!token) {
        return next(getErrorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
        if (err) {
            return next(getErrorHandler(401, "Unauthorized"));
        }
        (req as IUserRequest).user = user;
        next();
    });
};
