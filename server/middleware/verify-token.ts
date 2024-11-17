import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

import { getErrorHandler } from "~utils";

declare global {
    interface JwtPayload {
        id: ObjectId;
        isAdmin: boolean;
    }

    namespace Express {
        interface Request {
            user?: jwt.JwtPayload | undefined;
        }
    }
}

export const verifyToken = async (req: Request, _res: any, next: NextFunction) => {
    const token: string = req.cookies.access_token;

    if (!token) {
        return next(getErrorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
        if (err || !user || typeof user === "string") {
            return next(getErrorHandler(401, "Unauthorized"));
        }
        req.user = user;
        next();
    });
};
