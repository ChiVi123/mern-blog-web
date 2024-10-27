import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Spinner } from 'flowbite-react';

import Menubar from './menubar';

import { memo } from 'react';
import './text-editor.css';

interface IProps {
    defaultValue?: string;
    onChange?: (value: string) => void;
}

function TextEditor({ defaultValue, onChange }: IProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: 'Write something...' }),
        ],
        content: defaultValue || '',
        onUpdate: (props) => {
            if (onChange) {
                onChange(props.editor.getHTML());
            }
        },
    });

    if (!editor) {
        return (
            <div className='flex justify-center items-center'>
                <Spinner aria-label='Waiting editor loading...' size='xl' />
            </div>
        );
    }

    return (
        <div className='h-72 mb-12 border'>
            <Menubar editor={editor} />
            <EditorContent editor={editor} className='custom-tiptap-wrapper' />
        </div>
    );
}

export default memo(TextEditor);
