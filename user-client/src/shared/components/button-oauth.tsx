import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { authFirebase } from '~config';
import { useAppDispatch } from '~core/store';
import { continueWithGoogleRepo, userActions } from '~modules/user';

function ButtonOauth() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(authFirebase, provider);
            const result = await continueWithGoogleRepo({
                name: resultFromGoogle.user.displayName!,
                email: resultFromGoogle.user.email!,
                googlePhotoUrl: resultFromGoogle.user.photoURL!,
            });

            if (!('success' in result && !result.success)) {
                dispatch(userActions.signInSuccess(result));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleSignInWithGoogle}>
            <AiFillGoogleCircle className='size-6 mr-2' />
            Continue with Google
        </Button>
    );
}

export default ButtonOauth;
