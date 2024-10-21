import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const postDetailRouter: RouteObject = {
    path: '/post/:slug',
    Component: lazy(() => import('./page')),
};
