import { metaDataKey } from "~core";

export function Controller(base: string = ""): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(metaDataKey.routeBase, base, target);
    };
}
