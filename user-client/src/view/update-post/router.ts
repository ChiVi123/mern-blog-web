import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const updatePostRouter: RouteObject = {
    path: '/update-post/:id',
    Component: lazy(() => import('./page')),
};
