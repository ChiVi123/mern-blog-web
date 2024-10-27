import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { allUserRepo, deleteUserRepo, IUserEntity, userSelectors } from '~modules/user';

function UserListPage() {
    const currentUser = useSelector(userSelectors.data);
    const [userList, setUserList] = useState<IUserEntity[]>([]);
    const [showMore, setShowMore] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string>('');

    useEffect(() => {
        (async () => {
            if (!currentUser?.isAdmin) {
                return;
            }

            const result = await allUserRepo({});
            if ('success' in result) {
                console.log(result);
                return;
            }
            setUserList(result.users);
        })();

        return () => {};
    }, [currentUser?.isAdmin]);

    const handleShowMore = async () => {
        const result = await allUserRepo({ start_index: userList.length });
        if ('success' in result) {
            console.log(result);
            return;
        }

        setUserList((prev) => [...prev, ...result.users]);
        if (result.users.length < 10) {
            setShowMore(false);
        }
    };
    const handleDeleteUser = async () => {
        const result = await deleteUserRepo(userIdToDelete);
        if (typeof result === 'string') {
            setUserList((prev) => prev.filter((item) => item._id !== userIdToDelete));
            setShowModal(false);
            return;
        }
        console.log(result);
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser?.isAdmin && Boolean(userList.length) && (
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date created</Table.HeadCell>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className='divide-y'>
                        {userList.map((user) => (
                            <Table.Row key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <img
                                        src={user.profilePicture}
                                        alt={user.username}
                                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                                    />
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>
                                    {user.isAdmin ? (
                                        <FaCheck className='text-green-500' />
                                    ) : (
                                        <FaTimes className='text-red-500' />
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                            setUserIdToDelete(user._id);
                                        }}
                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}

            {currentUser?.isAdmin && Boolean(userList.length) && showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                    Show more
                </button>
            )}

            {!(currentUser?.isAdmin && Boolean(userList.length)) && <p>You have no users yet!</p>}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this user?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
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

export default UserListPage;
