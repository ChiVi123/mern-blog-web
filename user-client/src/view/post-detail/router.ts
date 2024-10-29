import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { postListRepo } from '~modules/post';

export const postDetailRouter: RouteObject = {
    path: '/post/:slug',
    Component: lazy(() => import('./page')),
    loader: async ({ params: { slug } }) => {
        const resultBySlug = await postListRepo({ slug });
        const resultRecent = await postListRepo({ limit: 3 });

        if ('success' in resultBySlug) {
            console.log(resultBySlug);
            return;
        }

        document.title = `${resultBySlug.posts[0].title} | cVi's Blog Application`;

        if ('success' in resultRecent) {
            console.log(resultRecent);
            return;
        }

        return { post: resultBySlug.posts[0], recentPosts: resultRecent.posts };
    },
};
