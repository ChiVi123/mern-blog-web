import { Button, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    return (
        <Navbar>
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    BuRoKuGu's
                </span>
                Blog
            </Link>

            <form>
                <TextInput
                    id='top-bar-search'
                    name='search'
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button type='button' aria-label='top bar search button' color='gray' pill className='w-12 h-10 lg:hidden'>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <Button
                    type='button'
                    aria-label='top bar toggle theme'
                    color='gray'
                    pill
                    className='w-12 h-10 hidden sm:inline'
                >
                    <FaMoon />
                </Button>

                <Link to='/sign-in'>
                    <Button type='button' outline gradientDuoTone='purpleToBlue'>
                        Sign In
                    </Button>
                </Link>

                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <NavLink to='/'>
                    {({ isActive }) => (
                        <Navbar.Link as='div' to='/' active={isActive}>
                            Home
                        </Navbar.Link>
                    )}
                </NavLink>

                <NavLink to='/about'>
                    {({ isActive }) => (
                        <Navbar.Link as='div' to='/' active={isActive}>
                            About
                        </Navbar.Link>
                    )}
                </NavLink>

                <NavLink to='/projects'>
                    {({ isActive }) => (
                        <Navbar.Link as='div' to='/' active={isActive}>
                            Projects
                        </Navbar.Link>
                    )}
                </NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
