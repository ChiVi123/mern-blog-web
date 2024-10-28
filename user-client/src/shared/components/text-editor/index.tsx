import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Spinner, Tooltip } from 'flowbite-react';
import { memo } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

import Menubar from './menubar';

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
            Highlight,
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
        <>
            <Tooltip
                content={
                    <div className='post-content h-96 overflow-y-auto'>
                        <h3>Heading</h3>
                        <p>
                            Type <mark># </mark> &nbsp; at the beginning of a new line and it will magically transform
                            to a heading, same for <mark>## </mark>, <mark>### </mark>, <mark>#### </mark>,&nbsp;
                            <mark>##### </mark>and <mark>###### </mark>. Remember after <mark>#</mark> is a white space.
                        </p>
                        <h3>Highlight</h3>
                        <p>
                            Type <mark>==two equal signs==</mark> and it will magically transform to highlighted text
                        </p>
                        <h3>Code inline</h3>
                        <p>
                            Type something with `back-ticks around` and it will magically transform to inline code while
                            you type.
                        </p>
                        <h3>Code block</h3>
                        <p>
                            Type <mark>```</mark> (three backticks and a space) or <mark>~~~</mark> (three tildes and a
                            space) and a code block is instantly added for you
                        </p>
                        <p>
                            Press <code>Command/Ctrl + Enter</code> to leave the fenced code block and continue typing
                        </p>
                    </div>
                }
                className='w-fit'
            >
                <span>Hover right here to read guide </span>
                <FaRegQuestionCircle className='inline' />
            </Tooltip>

            <div className='h-72 mb-12 border'>
                <Menubar editor={editor} />
                <EditorContent editor={editor} className='custom-tiptap-wrapper post-content' />
            </div>
        </>
    );
}

export default memo(TextEditor);
