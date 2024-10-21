import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const signUpRouter: RouteObject = {
    path: '/sign-up',
    Component: lazy(() => import('./page')),
};
