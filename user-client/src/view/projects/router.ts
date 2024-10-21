import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const projectsRouter: RouteObject = {
    path: '/projects',
    Component: lazy(() => import('./page')),
};
