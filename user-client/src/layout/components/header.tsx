import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '~core/store';
import { themeActions, themeSelectors } from '~modules/theme';
import { userActions, userSelectors } from '~modules/user';
import { fetchSignOut } from '~modules/user/async';

function Header() {
    const user = useSelector(userSelectors.data);
    const theme = useSelector(themeSelectors.data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const location = useLocation();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('search_term');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleSignOut = async () => {
        dispatch(userActions.reset());
        await dispatch(fetchSignOut());
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('search_term', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    BuRoKuGu's
                </span>
                Blog
            </Link>

            <form onSubmit={handleSubmit}>
                <TextInput
                    id='top-bar-search'
                    name='search'
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    onClick={() => dispatch(themeActions.toggle())}
                >
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>

                {user ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar img={user.profilePicture} alt='user' rounded />}>
                        <Dropdown.Header>
                            <span className='block text-sm'>@{user.username}</span>
                            <span className='block text-sm font-medium truncate'>{user.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard/profile'>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button type='button' outline gradientDuoTone='purpleToBlue'>
                            Sign In
                        </Button>
                    </Link>
                )}

                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <Navbar.Link as={NavLink} to='/' active={pathname === '/'}>
                    Home
                </Navbar.Link>

                <Navbar.Link as={NavLink} to='/about' active={pathname === '/about'}>
                    About
                </Navbar.Link>

                <Navbar.Link as={NavLink} to='/projects' active={pathname === '/projects'}>
                    Projects
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
