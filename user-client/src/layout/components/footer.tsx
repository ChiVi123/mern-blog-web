import { Footer as FooterFlowbite } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <FooterFlowbite container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
                        >
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                                BuRoKuGu's
                            </span>
                            Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <FooterFlowbite.Title title='About' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link
                                    href='https://www.100jsprojects.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    100 JS Projects
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link href='/about' target='_blank' rel='noopener noreferrer'>
                                    BuRoKuGu's Blog
                                </FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>
                        <div>
                            <FooterFlowbite.Title title='Follow us' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link
                                    href='https://www.github.com/ChiVi123'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Github
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link href='#'>Discord</FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>
                        <div>
                            <FooterFlowbite.Title title='Legal' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link href='#'>Privacy Policy</FooterFlowbite.Link>
                                <FooterFlowbite.Link href='#'>Terms &amp; Conditions</FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>
                    </div>
                </div>
                <FooterFlowbite.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <FooterFlowbite.Copyright href='#' by="BuRoKuGu's blog" year={new Date().getFullYear()} />
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <FooterFlowbite.Icon href='#' icon={BsFacebook} />
                        <FooterFlowbite.Icon href='#' icon={BsInstagram} />
                        <FooterFlowbite.Icon href='#' icon={BsTwitter} />
                        <FooterFlowbite.Icon href='https://github.com/ChiVi123' icon={BsGithub} />
                        <FooterFlowbite.Icon href='#' icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </FooterFlowbite>
    );
}

export default Footer;
