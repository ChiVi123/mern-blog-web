import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { deleteCommentRepo, ICommentEntity, queryCommentRepo } from '~modules/comment';
import { userSelectors } from '~modules/user';

function CommentList() {
    const currentUser = useSelector(userSelectors.data);
    const [showMore, setShowMore] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [comments, setComments] = useState<ICommentEntity[]>([]);
    const [commentDelete, setCommentDelete] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const result = await queryCommentRepo({});
            if ('success' in result) {
                console.log(result);
                return;
            }

            setComments(result.comments);
            if (result.comments.length < 10) {
                setShowModal(false);
            }
        })();
    }, []);

    const handleShowMoreComment = async () => {
        const start_index = comments.length;
        const result = await queryCommentRepo({ start_index });
        if ('success' in result) {
            console.log(result);
            return;
        }
        setComments((prev) => [...prev, ...result.comments]);
        if (result.comments.length < 10) {
            setShowMore(false);
        }
    };
    const handleDeleteComment = async () => {
        setShowModal(false);
        if (!commentDelete) {
            return;
        }
        const result = await deleteCommentRepo(commentDelete);
        if (typeof result !== 'string') {
            console.log(result);
            return;
        }

        setComments(comments.filter((item) => item._id !== commentDelete));
    };

    return (
        <div
            className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'
        >
            {currentUser?.isAdmin && comments?.length > 0 ? (
                <>
                    {/* table display all post */}
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell align='center'>Date updated</Table.HeadCell>
                            <Table.HeadCell align='center'>Comment content</Table.HeadCell>
                            <Table.HeadCell align='center'>Number of likes</Table.HeadCell>
                            <Table.HeadCell align='center'>PostId</Table.HeadCell>
                            <Table.HeadCell align='center'>UserId</Table.HeadCell>
                            <Table.HeadCell align='center'>Delete</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {comments.map((comment) => (
                                <Table.Row key={comment._id} className='bg-white dark:bg-gray-900 dark:border-gray-800'>
                                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{comment.content}</Table.Cell>
                                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                    <Table.Cell>{comment.postId}</Table.Cell>
                                    <Table.Cell>{comment.userId}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setCommentDelete(comment._id);
                                                setShowModal(true);
                                            }}
                                            className='text-red-500 hover:underline cursor-pointer font-medium'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    {/* button show more post */}
                    {showMore && (
                        <div className='mt-5 mb-3 w-full flex justify-center items-center'>
                            <button
                                onClick={handleShowMoreComment}
                                className='w-40 text-teal-500 hover:bg-teal-500 hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition duration-200 text-md py-2 rounded-lg border border-teal-500'
                            >
                                Show more
                            </button>
                        </div>
                    )}

                    {/* show modal to confirm delete post */}
                    {showModal && (
                        <Modal show={showModal} onClose={() => setShowModal(false)} size='md' popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className='text-center'>
                                    <HiOutlineExclamationCircle className='text-red-500 text-5xl mx-auto' />
                                    <span className='text-lg font-medium text-black'>
                                        This action cannot be undone. Do you want to delete this comment?
                                    </span>
                                    <div className='flex justify-between items-center mt-5'>
                                        <Button color='gray' onClick={() => setShowModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button color='failure' onClick={handleDeleteComment}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            ) : (
                <p>You have no comments!</p>
            )}
        </div>
    );
}

export default CommentList;
