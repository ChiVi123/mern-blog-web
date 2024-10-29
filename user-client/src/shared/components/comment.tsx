import { Button, Textarea } from 'flowbite-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import { editCommentRepo, ICommentEntity } from '~modules/comment';
import { IUserEntity, userInfo, userSelectors } from '~modules/user';

interface IProps {
    comment: ICommentEntity;
    onLike: (id: string) => void;
    onEdit: (commentId: string, content: string) => void;
    onDelete: (id: string) => void;
}

function Comment({ comment, onDelete, onEdit, onLike }: IProps) {
    const currentUser = useSelector(userSelectors.data);
    const [user, setUser] = useState<IUserEntity | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedContent, setEditedContent] = useState<string>(comment.content);

    useEffect(() => {
        (async function () {
            const result = await userInfo(comment.userId);
            if (!('success' in result)) {
                setUser(result);
            }
        })();
    }, [comment.userId]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };
    const handleSave = async () => {
        const result = await editCommentRepo(comment._id, { content: editedContent });
        if ('success' in result) {
            console.log(result);
            return;
        }

        setIsEditing(false);
        onEdit(comment._id, editedContent);
    };

    if (!user) {
        return null;
    }

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                            <Button type='button' size='sm' gradientDuoTone='purpleToBlue' onClick={handleSave}>
                                Save
                            </Button>
                            <Button
                                type='button'
                                size='sm'
                                gradientDuoTone='purpleToBlue'
                                outline
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button
                                type='button'
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${
                                    currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'
                                }`}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                            </p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button
                                        type='button'
                                        onClick={handleEdit}
                                        className='text-gray-400 hover:text-blue-500'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => onDelete(comment._id)}
                                        className='text-gray-400 hover:text-red-500'
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Comment;
