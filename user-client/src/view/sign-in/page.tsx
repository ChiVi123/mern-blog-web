import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { FormEventHandler, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonOauth } from '~components';
import { useAppDispatch } from '~core/store';
import { IUserEntity, userSelectors } from '~modules/user';
import { fetchSignIn } from '~modules/user/async';

function SignInPage() {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const userState = useSelector(userSelectors.allState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userState.loading === 'fulfilled') {
            navigate('/');
        }
    }, [navigate, userState.loading]);

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        const data = inputRefs.current.reduce(
            (prev, current) => ({ ...prev, [current.name]: current.value }),
            {} as IUserEntity,
        );
        await dispatch(fetchSignIn(data));
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            cVi's
                        </span>
                        Blog
                    </Link>

                    <p className='text-sm mt-5'>
                        This is a demo project. You can sign in with your email and password or with Google.
                    </p>
                </div>

                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                ref={(ref) => {
                                    inputRefs.current[0] = ref!;
                                }}
                                id='email'
                                name='email'
                                type='email'
                                placeholder='name@gmail.com   '
                            />
                        </div>

                        <div>
                            <Label value='Your password' />
                            <TextInput
                                ref={(ref) => {
                                    inputRefs.current[1] = ref!;
                                }}
                                id='password'
                                name='password'
                                type='password'
                                placeholder='********'
                            />
                        </div>

                        <Button type='submit' gradientDuoTone='purpleToPink' disabled={userState.loading === 'pending'}>
                            {userState.loading === 'pending' ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <ButtonOauth />
                    </form>

                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don't have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>
                            Sign Up
                        </Link>
                    </div>

                    {userState.loading === 'rejected' && (
                        <Alert className='mt-5' color='failure'>
                            {userState.error}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
