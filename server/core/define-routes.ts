import { Express } from "express";
import { Controller, RouteHandlerMap } from "~types";
import { metaDataKey } from "./constant";

export function defineRoutes(controllers: (typeof Controller)[], application: Express) {
    for (const Controller of controllers) {
        const controller = new Controller();
        const routeHandlerMap: RouteHandlerMap = Reflect.getMetadata(metaDataKey.routeHandlerMap, controller);
        const baseRoute: string = Reflect.getMetadata(metaDataKey.routeBase, Controller);

        for (const [method, routeMap] of routeHandlerMap.entries()) {
            for (const [path, handlers] of routeMap.entries()) {
                application[method](baseRoute + path, handlers);
            }
        }
    }
}
