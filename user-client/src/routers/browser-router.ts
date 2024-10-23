import { createBrowserRouter } from 'react-router-dom';

import { DashBoardLayout, DefaultLayout } from '~layout';
import { aboutRouter } from '~view/about/router';
import { dashboardCommentListRouter } from '~view/dashboard/comment-list/router';
import { dashboardPostListRouter } from '~view/dashboard/post-list/router';
import { dashboardProfileRouter } from '~view/dashboard/profile/router';
import { dashboardUserListRouter } from '~view/dashboard/user-list/router';
import { homeRouter } from '~view/home/router';
import { postDetailRouter } from '~view/post-detail/router';
import { projectsRouter } from '~view/projects/router';
import { searchRouter } from '~view/search/router';
import { signInRouter } from '~view/sign-in/router';
import { signUpRouter } from '~view/sign-up/router';

import { PrivateRoute } from './components';

export const browserRouter = createBrowserRouter([
    {
        path: '',
        Component: DefaultLayout,
        children: [aboutRouter, homeRouter, postDetailRouter, projectsRouter, searchRouter, signInRouter, signUpRouter],
    },
    {
        path: '',
        Component: DashBoardLayout,
        children: [
            {
                path: '/dashboard',
                Component: PrivateRoute,
                children: [
                    dashboardProfileRouter,
                    dashboardPostListRouter,
                    dashboardUserListRouter,
                    dashboardCommentListRouter,
                ],
            },
        ],
    },
]);
