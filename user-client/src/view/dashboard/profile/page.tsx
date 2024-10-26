import 'react-circular-progressbar/dist/styles.css';

import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~core/store';
import { IUserEntity, userActions, userSelectors } from '~modules/user';
import { fetchDeleteUser, fetchSignOut, fetchUpdateUser } from '~modules/user/async';

import { InputImage } from './components';

function ProfilePage() {
    const [formData, setFormData] = useState<Partial<IUserEntity>>({});
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { data: user, type: actionType, loading, error } = useSelector(userSelectors.allState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(userActions.reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (actionType === 'fetchDeleteUser' && loading === 'fulfilled') {
            dispatch(userActions.clear());
        }
    }, [actionType, dispatch, loading]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            return;
        }

        dispatch(userActions.reset());
        await dispatch(fetchUpdateUser({ ...formData, _id: user!._id }));
    };
    const handleDeleteUser = async () => {
        dispatch(userActions.reset());
        await dispatch(fetchDeleteUser({ id: user!._id }));
    };
    const handleSignOut = async () => {
        dispatch(userActions.reset());
        await dispatch(fetchSignOut());
    };

    return (
        <div className='max-w-lg mx-auto w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <InputImage
                    profilePicture={user?.profilePicture}
                    onChange={(value) => setFormData((prev) => ({ ...prev, profilePicture: value }))}
                />

                <TextInput
                    type='text'
                    id='username'
                    name='username'
                    placeholder='Username'
                    defaultValue={user?.username}
                    onChange={handleChange}
                />

                <TextInput
                    type='email'
                    id='email'
                    name='email'
                    placeholder='name@gmail.com'
                    defaultValue={user?.email}
                    disabled
                />

                <TextInput
                    type='password'
                    id='password'
                    name='password'
                    placeholder='***************'
                    onChange={handleChange}
                />

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer' onClick={() => setOpenModal(true)}>
                    Delete Account
                </span>
                <span className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </span>
            </div>

            {loading === 'fulfilled' && <Alert color='success'>User's profile updated successfully</Alert>}
            {loading === 'rejected' && error && <Alert color='failure'>{error}</Alert>}

            <Modal show={openModal} onClose={() => setOpenModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProfilePage;
