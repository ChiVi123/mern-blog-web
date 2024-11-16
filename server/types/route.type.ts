import { Express, RequestHandler } from "express";

export type RouteHandlerMap = Map<keyof Express, Map<string, RequestHandler[]>>;
