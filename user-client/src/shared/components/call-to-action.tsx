import { Button } from 'flowbite-react';

function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>Want to see more projects?</h2>
                <p className='text-gray-500 my-2'>
                    Contact me{' '}
                    <a
                        href='https://www.linkedin.com/in/chivi18/'
                        className='text-cyan-700 font-semibold hover:underline'
                    >
                        LinkedIn
                    </a>
                </p>

                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href='https://github.com/ChiVi123/' target='_blank' rel='noopener noreferrer'>
                        My Github
                    </a>
                </Button>
            </div>
            <div className='p-7 flex-1'>
                <img src='https://firebasestorage.googleapis.com/v0/b/mern-blog-69ecb.appspot.com/o/call-action%20(1).webp?alt=media&token=b7acdf4e-887d-4587-83be-c9a88b2e4db7' />
            </div>
        </div>
    );
}

export default CallToAction;
