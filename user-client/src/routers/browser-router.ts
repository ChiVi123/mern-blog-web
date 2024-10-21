import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '~layout';
import { aboutRouter } from '~view/about/router';
import { createPostRouter } from '~view/create-post/router';
import { homeRouter } from '~view/home/router';
import { postDetailRouter } from '~view/post-detail/router';
import { projectsRouter } from '~view/projects/router';
import { searchRouter } from '~view/search/router';
import { signInRouter } from '~view/sign-in/router';
import { signUpRouter } from '~view/sign-up/router';
import { updatePostRouter } from '~view/update-post/router';

export const browserRouter = createBrowserRouter([
    {
        path: '',
        Component: DefaultLayout,
        children: [
            aboutRouter,
            createPostRouter,
            homeRouter,
            postDetailRouter,
            projectsRouter,
            searchRouter,
            signInRouter,
            signUpRouter,
            updatePostRouter,
        ],
    },
]);
