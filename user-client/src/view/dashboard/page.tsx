import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ICommentListData, queryCommentRepo } from '~modules/comment';
import { PostListDataType, postListRepo } from '~modules/post';
import { allUserRepo, IUserListData } from '~modules/user';

function DashboardPage() {
    const [userData, setUserData] = useState<IUserListData | null>(null);
    const [commentData, setCommentData] = useState<ICommentListData | null>(null);
    const [postData, setPostData] = useState<PostListDataType | null>(null);

    useEffect(() => {
        (async () => {
            const result = await allUserRepo({ limit: 5 });
            if ('success' in result) {
                console.log(result);
                return;
            }

            setUserData(result);
        })();

        (async () => {
            const result = await postListRepo({ limit: 5 });
            if ('success' in result) {
                console.log(result);
                return;
            }

            setPostData(result);
        })();

        (async () => {
            const result = await queryCommentRepo({ limit: 5 });
            if ('success' in result) {
                console.log(result);
                return;
            }

            setCommentData(result);
        })();
    }, []);

    return (
        <div className='p-3 md:mx-auto'>
            <div className='flex-wrap flex gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{userData?.totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {userData?.lastMonthUsers}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'>{commentData?.total}</p>
                        </div>
                        <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {commentData?.lastMonthComments}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                            <p className='text-2xl'>{postData?.total}</p>
                        </div>
                        <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {postData?.lastMonthPosts}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent users</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard/user-list'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>
                        {userData?.users &&
                            userData.users.map((user) => (
                                <Table.Body key={user._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <img
                                                src={user.profilePicture}
                                                alt='user'
                                                className='w-10 h-10 rounded-full bg-gray-500'
                                            />
                                        </Table.Cell>
                                        <Table.Cell>{user.username}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent comments</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard/comment-list'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {commentData?.comments &&
                            commentData.comments.map((comment) => (
                                <Table.Body key={comment._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell className='w-96'>
                                            <p className='line-clamp-2'>{comment.content}</p>
                                        </Table.Cell>
                                        <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent posts</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard/post-list'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {postData?.posts &&
                            postData.posts.map((post) => (
                                <Table.Body key={post._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <img
                                                src={post.image}
                                                alt='user'
                                                className='w-14 h-10 rounded-md bg-gray-500'
                                            />
                                        </Table.Cell>
                                        <Table.Cell className='w-96'>{post.title}</Table.Cell>
                                        <Table.Cell className='w-5'>{post.category}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
