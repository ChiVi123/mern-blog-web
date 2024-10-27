import { Alert, Button, Select, TextInput } from 'flowbite-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { InputImageField, TextEditor } from '~components';
import { SubmitHandler, useFormState } from '~hook';
import { IPostEntity, updatePostRepo } from '~modules/post';
import { userSelectors } from '~modules/user';

function UpdatePostPage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [textHTML, setTextHTML] = useState<string>('');
    const { error, loading, onSubmit } = useFormState();
    const inputRefs = useRef<(HTMLSelectElement | HTMLInputElement)[]>([]);
    const navigate = useNavigate();
    const loader = useLoaderData() as string | IPostEntity;
    const isPostEntity = useCallback(
        (value: string | IPostEntity): value is IPostEntity => typeof value !== 'string',
        [],
    );
    const user = useSelector(userSelectors.data);

    useEffect(() => {
        if (isPostEntity(loader)) {
            setImageUrl(loader.image);
        }
    }, [isPostEntity, loader]);

    const handleSubmit: SubmitHandler = async (setError, setLoading) => {
        const formData: Record<string, unknown> = inputRefs.current.reduce(
            (prev, current) => ({ ...prev, [current.name]: current.value }),
            {},
        );
        formData.image = imageUrl;
        formData.content = textHTML;

        if (isPostEntity(loader)) {
            const result = await updatePostRepo(loader._id, user!._id, formData);

            if ('success' in result) {
                setError(result.message);
                setLoading('rejected');
                return;
            }

            navigate(`/post/${result.slug}`);
        }
    };
    const handleInputImageChange = useCallback((value: string) => {
        setImageUrl(value);
    }, []);
    const handleTextEditorChange = useCallback((value: string) => {
        setTextHTML(value);
    }, []);

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>

            <form className='flex flex-col gap-4' onSubmit={onSubmit(handleSubmit)}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        ref={(ref) => (inputRefs.current[0] = ref!)}
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        name='title'
                        defaultValue={isPostEntity(loader) ? loader.title : ''}
                        className='flex-1'
                    />
                    <label htmlFor='category' className='visually-hidden'>
                        Category
                    </label>
                    <Select
                        ref={(ref) => (inputRefs.current[1] = ref!)}
                        id='category'
                        name='category'
                        defaultValue={isPostEntity(loader) ? loader.category : 'uncategorized'}
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>

                <InputImageField onChange={handleInputImageChange} />

                {imageUrl && <img src={imageUrl} alt='upload' className='w-full h-72 object-cover' />}

                <TextEditor
                    defaultValue={isPostEntity(loader) ? loader.content : textHTML}
                    onChange={handleTextEditorChange}
                />

                <Button
                    type='submit'
                    gradientDuoTone='purpleToPink'
                    isProcessing={loading === 'pending'}
                    disabled={loading === 'pending'}
                >
                    Update post
                </Button>

                {loading === 'rejected' && Boolean(error) && (
                    <Alert className='mt-5' color='failure'>
                        {error}
                    </Alert>
                )}
            </form>
        </div>
    );
}

export default UpdatePostPage;
