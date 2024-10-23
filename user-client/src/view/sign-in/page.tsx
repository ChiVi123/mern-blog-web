import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { FormEventHandler, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInRepo } from '~modules/user';

interface IUserForm {
    email: string;
    password: string;
}

function SignInPage() {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        const data = inputRefs.current.reduce(
            (prev, current) => ({ ...prev, [current.name]: current.value }),
            {} as IUserForm,
        );
        setLoading(true);
        setErrorMessage(null);

        const result = await signInRepo(data);

        if ('success' in result && !result.success) {
            setErrorMessage(result.message);
        } else {
            navigate('/');
        }

        setLoading(false);
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            BuRoKuGu's
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

                        <Button type='submit' gradientDuoTone='purpleToPink' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don't have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>
                            Sign Up
                        </Link>
                    </div>

                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
