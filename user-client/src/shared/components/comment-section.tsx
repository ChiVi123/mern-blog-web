import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useFormState } from '~hook';
import {
    createCommentRepo,
    deleteCommentRepo,
    ICommentEntity,
    likeCommentRepo,
    listCommentRepo,
} from '~modules/comment';
import { userSelectors } from '~modules/user';
import Comment from './comment';

interface IProps {
    postId: string;
}

function CommentSection({ postId }: IProps) {
    const currentUser = useSelector(userSelectors.data);
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<ICommentEntity[]>([]);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
    const { error, onSubmit } = useFormState();
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await listCommentRepo(postId);
            if ('success' in result) {
                console.log(result);
                return;
            }

            setComments(result);
        })();
    }, [postId]);

    const handleSubmit: SubmitHandler = async (setError) => {
        if (comment.length > 200) {
            return;
        }

        setError(null);
        const result = await createCommentRepo({ content: comment, postId, userId: currentUser?._id });

        if ('success' in result) {
            setError(result.message);
            return;
        }
        setComments((prev) => [result, ...prev]);
    };
    const handleLike = async (commentId: string) => {
        if (!currentUser) {
            return navigate('/sign-in');
        }

        const result = await likeCommentRepo(commentId);
        if ('success' in result) {
            console.log(result);
            return;
        }

        setComments(
            comments.map((item) =>
                item._id === result._id ? { ...item, likes: result.likes, numberOfLikes: result.likes.length } : item,
            ),
        );
    };
    const handleEdit = (commentId: string, content: string) => {
        setComments(comments.map((item) => (item._id === commentId ? { ...item, content } : item)));
    };
    const handleDelete = async (commentId: string | null) => {
        setShowModal(false);

        if (!currentUser) {
            return navigate('/sign-in');
        }
        if (!commentId) {
            return;
        }

        const result = await deleteCommentRepo(commentId);
        if (typeof result !== 'string') {
            console.log(result);
            return;
        }
        setComments(comments.filter((item) => item._id !== commentId));
    };

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt='' />
                    <Link to={'/dashboard/profile'} className='text-xs text-cyan-600 hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={onSubmit(handleSubmit)} className='border border-teal-500 rounded-md p-3'>
                    <Textarea
                        placeholder='Add a comment...'
                        rows={3}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                            Submit
                        </Button>
                    </div>
                    {error && (
                        <Alert color='failure' className='mt-5'>
                            {error}
                        </Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>
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

export default CommentSection;
