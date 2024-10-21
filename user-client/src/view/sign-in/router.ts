import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const signInRouter: RouteObject = {
    path: '/sign-in',
    Component: lazy(() => import('./page')),
};
