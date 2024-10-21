import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const homeRouter: RouteObject = {
    path: '/',
    Component: lazy(() => import('./page')),
};
