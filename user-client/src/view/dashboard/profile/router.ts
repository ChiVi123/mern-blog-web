import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const dashboardProfileRouter: RouteObject = {
    path: 'profile',
    Component: lazy(() => import('./page')),
};
