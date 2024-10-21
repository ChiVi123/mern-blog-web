import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const searchRouter: RouteObject = {
    path: '/search',
    Component: lazy(() => import('./page')),
};
