import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import { Button, ButtonProps, Select } from 'flowbite-react';
import { ChangeEventHandler, useCallback } from 'react';
import { FaBold, FaItalic, FaLink, FaListUl, FaUnderline } from 'react-icons/fa6';
import { ImListNumbered } from 'react-icons/im';
import { MdFormatClear } from 'react-icons/md';

interface IProps {
    editor: Editor;
}
type LevelHeading = 1 | 2 | 3 | 4 | 5 | 6;

function Menubar({ editor }: IProps) {
    const buttonEditor = useCallback(
        (props: ButtonProps) => <Button size='xs' color='gray' className='border-none' {...props} />,
        [],
    );
    const iconClass = useCallback((isActive: boolean) => clsx('size-4', { 'text-cyan-700': isActive }), []);

    const handleSetLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);
    const handleSelect: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            const level = Number(e.target.value) as LevelHeading;
            if (!level) {
                editor.chain().focus().setParagraph().run();
                return;
            }

            editor.chain().focus().toggleHeading({ level }).run();
        },
        [editor],
    );
    const checkTypography = useCallback(() => {
        return Array.from({ length: 6 }, (_, i) => i + 1).find((level) => editor.isActive('heading', { level }));
    }, [editor]);

    return (
        <div className='flex flex-wrap items-center gap-2 p-2 border-b'>
            <label htmlFor='typography' className='visually-hidden'>
                typography
            </label>
            <Select id='typography' sizing='sm' value={checkTypography() || '0'} onChange={handleSelect}>
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
                <option value='0'>Normal</option>
            </Select>

            <Button.Group>
                {buttonEditor({
                    onClick: () => editor.chain().focus().toggleBold().run(),
                    children: (
                        <>
                            <span className='visually-hidden'>bold</span>
                            <FaBold className={iconClass(editor.isActive('bold'))} />
                        </>
                    ),
                })}

                {buttonEditor({
                    onClick: () => editor.chain().focus().toggleItalic().run(),
                    children: (
                        <>
                            <span className='visually-hidden'>italic</span>
                            <FaItalic className={iconClass(editor.isActive('italic'))} />
                        </>
                    ),
                })}

                {buttonEditor({
                    onClick: () => editor.chain().focus().toggleUnderline().run(),
                    children: (
                        <>
                            <span className='visually-hidden'>underline</span>
                            <FaUnderline className={iconClass(editor.isActive('underline'))} />
                        </>
                    ),
                })}

                {buttonEditor({
                    onClick: handleSetLink,
                    children: (
                        <>
                            <span className='visually-hidden'>link</span>
                            <FaLink className={iconClass(editor.isActive('link'))} />
                        </>
                    ),
                })}
            </Button.Group>

            <Button.Group>
                {buttonEditor({
                    onClick: () => editor.chain().focus().toggleBulletList().run(),
                    children: (
                        <>
                            <span className='visually-hidden'>bullet list</span>
                            <FaListUl className={iconClass(editor.isActive('bulletList'))} />
                        </>
                    ),
                })}

                {buttonEditor({
                    onClick: () => editor.chain().focus().toggleOrderedList().run(),
                    children: (
                        <>
                            <span className='visually-hidden'>ordered list</span>
                            <ImListNumbered className={iconClass(editor.isActive('orderedList'))} />
                        </>
                    ),
                })}
            </Button.Group>

            {buttonEditor({
                onClick: () => {
                    editor.chain().focus().unsetAllMarks().run();
                    editor.commands.clearNodes();
                },
                children: (
                    <>
                        <span className='visually-hidden'>ordered list</span>
                        <MdFormatClear className={iconClass(editor.isActive('orderedList'))} />
                    </>
                ),
            })}
        </div>
    );
}

export default Menubar;
