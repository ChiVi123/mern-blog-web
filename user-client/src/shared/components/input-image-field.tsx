import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput } from 'flowbite-react';
import { memo, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { storageFirebase } from '~config';

interface IProps {
    onChange?: (value: string) => void;
}

function InputImageField({ onChange }: IProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
    const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null);

    const handleUploadImage = async () => {
        if (!imageFile) {
            setImageFileUploadError('Please select an image');
            return;
        }

        setImageFileUploadError(null);
        const filename = new Date().getTime() + '-' + imageFile.name;
        const storageRef = ref(storageFirebase, filename);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            ({ bytesTransferred, totalBytes }) => {
                const process: number = Math.floor((bytesTransferred / totalBytes) * 100);
                setImageUploadProgress(process);
            },
            (error) => {
                console.log('upload error:', error);
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageUploadProgress(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null);

                    if (onChange) {
                        onChange(downloadURL);
                    }
                });
            },
        );
    };

    return (
        <>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput
                    accept='image/*'
                    id='image'
                    name='image'
                    placeholder='image file...'
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />

                <Button
                    type='button'
                    gradientDuoTone='purpleToBlue'
                    size='sm'
                    outline
                    onClick={handleUploadImage}
                    disabled={Boolean(imageUploadProgress)}
                >
                    {imageUploadProgress ? (
                        <div className='size-16'>
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                        </div>
                    ) : (
                        'Upload Image'
                    )}
                </Button>
            </div>
            {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        </>
    );
}

export default memo(InputImageField);
