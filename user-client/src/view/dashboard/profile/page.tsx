import 'react-circular-progressbar/dist/styles.css';

import { Alert, Button, TextInput } from 'flowbite-react';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~core/store';
import { IUserEntity, userActions, userSelectors } from '~modules/user';
import { fetchUpdateUser } from '~modules/user/async';
import { InputImage } from './components';

function ProfilePage() {
    const [formData, setFormData] = useState<Partial<IUserEntity>>({});
    const { data: user, loading, error } = useSelector(userSelectors.allState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.reset());
    }, [dispatch]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            return;
        }

        await dispatch(fetchUpdateUser({ ...formData, _id: user!._id }));
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
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>

            {loading === 'fulfilled' && <Alert color='success'>User's profile updated successfully</Alert>}
            {loading === 'rejected' && error && <Alert color='failure'>{error}</Alert>}
        </div>
    );
}

export default ProfilePage;
