import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const aboutRouter: RouteObject = {
    path: '/about',
    Component: lazy(() => import('./page')),
};
