import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const dashboardPostListRouter: RouteObject = {
    path: 'post-list',
    Component: lazy(() => import('./page')),
};
