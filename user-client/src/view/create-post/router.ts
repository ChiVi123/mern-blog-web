import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const createPostRouter: RouteObject = {
    path: '/create-post',
    Component: lazy(() => import('./page')),
};
