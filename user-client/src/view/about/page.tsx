import { Link } from 'react-router-dom';

function AboutPage() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-2xl mx-auto p-3 text-center'>
                <h1 className='text-4xl font font-semibold text-center my-7'>
                    About &nbsp;
                    <span className='text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-green-500 hover:to-teal-600 hover:bg-clip-text'>
                        <Link to={'/'}>cVi</Link>
                    </span>
                    &apos; Blog
                </h1>
                <div className='text-md text-gray-500 flex flex-col gap-6'>
                    <p>
                        On this blog, you'll find articles and tutorials on topics such as web development, software
                        engineering, and programming languages.
                    </p>

                    <p>
                        We encourage you to leave comments on our posts and engage with other readers. You can like
                        other people's comments and reply to them as well. We believe that a community of learners can
                        help each other grow and improve.
                    </p>
                </div>

                <p className='mt-8 font-sign text-3xl text-right'>Chí Vĩ</p>
            </div>
        </div>
    );
}

export default AboutPage;
