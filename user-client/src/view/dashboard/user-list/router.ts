import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const dashboardUserListRouter: RouteObject = {
    path: 'user-list',
    Component: lazy(() => import('./page')),
};
