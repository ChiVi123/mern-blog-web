import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const dashboardRouter: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
};

export default dashboardRouter;
