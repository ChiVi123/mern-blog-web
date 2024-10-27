import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { postListRepo } from '~modules/post';

const updatePostRouter: RouteObject = {
    path: 'update-post/:postId',
    Component: lazy(() => import('./page')),
    loader: async ({ params }) => {
        const result = await postListRepo({ post_id: params.postId });
        if ('success' in result) {
            return result.message;
        }
        return result.posts[0];
    },
};

export default updatePostRouter;
