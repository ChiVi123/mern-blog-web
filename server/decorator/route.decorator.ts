import { Express, RequestHandler } from "express";

import { metaDataKey } from "~core";
import { RouteHandlerMap } from "~types";

export function Route(method: keyof Express, path: string = "", ...middlewares: RequestHandler[]): MethodDecorator {
    return (target, key, descriptor: PropertyDescriptor) => {
        const routeHandlerMap: RouteHandlerMap = Reflect.getMetadata(metaDataKey.routeHandlerMap, target) || new Map();

        if (!routeHandlerMap.has(method)) {
            routeHandlerMap.set(method, new Map());
        }

        routeHandlerMap.get(method)!.set(path, [...middlewares, descriptor.value]);
        Reflect.defineMetadata(metaDataKey.routeHandlerMap, routeHandlerMap, target);
    };
}
