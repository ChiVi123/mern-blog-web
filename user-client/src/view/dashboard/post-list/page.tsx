import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePostRepo, IPostEntity, postListRepo } from '~modules/post';
import { userSelectors } from '~modules/user';

function PostListPage() {
    const user = useSelector(userSelectors.data);
    const [posts, setPosts] = useState<IPostEntity[]>([]);
    const [showMore, setShowMore] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string>('');

    useEffect(() => {
        (async () => {
            if (!user?.isAdmin) {
                return;
            }

            const result = await postListRepo({ user_id: user?._id });
            if ('success' in result) {
                console.log(result);
                return;
            }
            setPosts(result.posts);
        })();

        return () => {};
    }, [user?._id, user?.isAdmin]);

    const handleShowMore = async () => {
        const result = await postListRepo({ user_id: user?._id, start_index: posts.length });
        if ('success' in result) {
            console.log(result);
            return;
        }
        setPosts((prev) => [...prev, ...result.posts]);
        if (result.posts.length < 10) {
            setShowMore(false);
        }
    };
    const handleDeletePost = async () => {
        setShowModal(false);

        const result = await deletePostRepo(postIdToDelete, user!._id);
        if (typeof result === 'string') {
            setPosts((prev) => prev.filter((item) => item._id !== postIdToDelete));
            return;
        }
        console.log(result);
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {user?.isAdmin && Boolean(posts.length) && (
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date updated</Table.HeadCell>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell colSpan={2}>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {posts.map((post) => (
                            <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                        <div className='w-20 h-10 bg-gray-500'>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='h-full mx-auto object-cover '
                                            />
                                        </div>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link
                                        className='font-medium text-gray-900 dark:text-white'
                                        to={`/post/${post.slug}`}
                                    >
                                        {post.title}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{post.category}</Table.Cell>
                                <Table.Cell colSpan={2} className='space-x-4'>
                                    <span
                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                        onClick={() => {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }}
                                    >
                                        Delete
                                    </span>
                                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                                        <span>Edit</span>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}

            {user?.isAdmin && Boolean(posts.length) && showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                    Show more
                </button>
            )}

            {!(user?.isAdmin && Boolean(posts.length)) && <p>You have no posts yet!</p>}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PostListPage;
