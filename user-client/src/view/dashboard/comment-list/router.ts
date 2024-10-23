import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const dashboardCommentListRouter: RouteObject = {
    path: 'comment-list',
    Component: lazy(() => import('./page')),
};
