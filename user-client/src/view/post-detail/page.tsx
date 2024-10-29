import { Button, Spinner } from 'flowbite-react';
import { Link, useLoaderData } from 'react-router-dom';

import { CallToAction, CommentSection, PostCard } from '~components';
import { IPostEntity } from '~modules/post';

function PostDetailPage() {
    const loader = useLoaderData() as { post: IPostEntity; recentPosts: IPostEntity[] } | undefined;

    if (!loader)
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {loader.post.title}
            </h1>
            <Link to={`/search?category=${loader.post.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>
                    {loader.post.category}
                </Button>
            </Link>

            <img
                src={loader.post.image}
                alt={loader.post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />

            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{new Date(loader.post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>{(loader.post.content.length / 1000).toFixed(0)} mins read</span>
            </div>

            <div
                className='p-3 max-w-4xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: loader.post.content }}
            ></div>

            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>

            <CommentSection postId={loader.post._id} />

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {loader.recentPosts && loader.recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>
        </main>
    );
}

export default PostDetailPage;
