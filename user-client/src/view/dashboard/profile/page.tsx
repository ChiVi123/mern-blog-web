import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { userSelectors } from '~modules/user';

function ProfilePage() {
    const user = useSelector(userSelectors.data);

    return (
        <div className='max-w-lg mx-auto w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

            <form className='flex flex-col gap-4'>
                <div className='size-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden'>
                    <img
                        src={user?.profilePicture}
                        alt='user'
                        className='size-full rounded-full border-8 border-[lightgray] object-cover'
                    />
                </div>

                <TextInput
                    type='text'
                    id='username'
                    name='username'
                    placeholder='Username'
                    defaultValue={user?.username}
                />

                <TextInput
                    type='email'
                    id='email'
                    name='email'
                    placeholder='name@gmail.com'
                    defaultValue={user?.email}
                />

                <TextInput type='password' id='password' name='password' placeholder='***************' />

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}

export default ProfilePage;
