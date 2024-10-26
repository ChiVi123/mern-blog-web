import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const createPostRouter: RouteObject = {
    path: 'create-post',
    Component: lazy(() => import('./page')),
};

export default createPostRouter;
