import 'react-circular-progressbar/dist/styles.css';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert } from 'flowbite-react';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { storageFirebase } from '~config';

interface IProps {
    profilePicture?: string | undefined;
}

function InputImage({ profilePicture }: IProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState<string | null>(null);
    const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null);
    const filePickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (imageFileUrl) {
                URL.revokeObjectURL(imageFileUrl);
            }
        };
    }, [imageFileUrl]);

    useEffect(() => {
        if (imageFile) {
            setImageFileUploadError(null);
            const filename = new Date().getTime() + '-' + imageFile.name;
            const storageRef = ref(storageFirebase, filename);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const process: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(process.toFixed(0));
                },
                (error) => {
                    console.log('upload error:', error);
                    setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageFileUrl(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageFileUrl(downloadURL);
                    });
                },
            );
        }
    }, [imageFile]);

    const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.currentTarget.files![0];
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    };

    return (
        <>
            <input
                ref={filePickerRef}
                aria-label='avatar input'
                type='file'
                id='photoUrl'
                name='photoUrl'
                accept='image/*'
                hidden
                onChange={handleImageChange}
            />
            <div
                className='relative size-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden'
                onClick={() => filePickerRef.current?.click()}
            >
                {imageFileUploadProgress && (
                    <CircularProgressbar
                        value={Number(imageFileUploadProgress) || 0}
                        text={`${imageFileUploadProgress || 0}%`}
                        strokeWidth={5}
                        styles={{
                            root: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
                            path: { stroke: `rgba(62, 152, 199, ${Number(imageFileUploadProgress || 0) / 100})` },
                        }}
                    />
                )}
                <img
                    src={imageFileUrl || profilePicture}
                    alt='user'
                    className={`size-full rounded-full border-8 border-[lightgray] object-cover ${
                        imageFileUploadProgress && Number(imageFileUploadProgress || 0) < 100 && 'opacity-60'
                    }`}
                />
            </div>
            {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        </>
    );
}

export default InputImage;
