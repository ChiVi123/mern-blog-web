import { Button, Select, TextInput } from 'flowbite-react';
import { FormEventHandler, useCallback, useRef, useState } from 'react';
import { InputImageField, TextEditor } from '~components';

function CreatePostPage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [textHTML, setTextHTML] = useState<string>('');
    const inputRefs = useRef<(HTMLSelectElement | HTMLInputElement)[]>([]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData: Record<string, unknown> = inputRefs.current.reduce(
            (prev, current) => ({ ...prev, [current.name]: current.value }),
            {},
        );
        formData.image = imageUrl;
        formData.content = textHTML;

        console.log(formData);
    };
    const handleInputImageChange = useCallback((value: string) => {
        setImageUrl(value);
    }, []);
    const handleTextEditorChange = useCallback((value: string) => {
        setTextHTML(value);
    }, []);

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        ref={(ref) => (inputRefs.current[0] = ref!)}
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        name='title'
                        className='flex-1'
                    />
                    <label htmlFor='category' className='visually-hidden'>
                        Category
                    </label>
                    <Select ref={(ref) => (inputRefs.current[1] = ref!)} id='category' name='category'>
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>

                <InputImageField onChange={handleInputImageChange} />

                {imageUrl && <img src={imageUrl} alt='upload' className='w-full h-72 object-cover' />}

                <TextEditor onChange={handleTextEditorChange} />

                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>

                {/* {publishError && (
                    <Alert className='mt-5' color='failure'>
                    {publishError}
                    </Alert>
                )} */}
            </form>
        </div>
    );
}

export default CreatePostPage;
