import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch } from '~core/store';
import { userActions, userSelectors } from '~modules/user';
import { fetchSignOut } from '~modules/user/async';

function DashboardSidebar() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const currentUser = useSelector(userSelectors.data);

    const handleSignOut = async () => {
        dispatch(userActions.reset());
        await dispatch(fetchSignOut());
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {currentUser && currentUser.isAdmin && (
                        <Sidebar.Item as={Link} to='/dashboard' active={pathname === '/dashboard'} icon={HiChartPie}>
                            Profile
                        </Sidebar.Item>
                    )}

                    <Sidebar.Item
                        as={Link}
                        to='/dashboard/profile'
                        label={currentUser?.isAdmin ? 'Admin' : 'User'}
                        labelColor='dark'
                        active={pathname === '/dashboard/profile'}
                        icon={HiUser}
                    >
                        Profile
                    </Sidebar.Item>

                    <Sidebar.Item
                        as={Link}
                        to='/dashboard/post-list'
                        active={pathname === '/dashboard/post-list'}
                        icon={HiDocumentText}
                    >
                        Posts
                    </Sidebar.Item>

                    {currentUser?.isAdmin && (
                        <Sidebar.Item
                            as={Link}
                            to='/dashboard/user-list'
                            active={pathname === '/dashboard/user-list'}
                            icon={HiOutlineUserGroup}
                        >
                            Users
                        </Sidebar.Item>
                    )}

                    {currentUser?.isAdmin && (
                        <Sidebar.Item
                            as={Link}
                            to='/dashboard/comment-list'
                            active={pathname === '/dashboard/comment-list'}
                            icon={HiAnnotation}
                        >
                            Comments
                        </Sidebar.Item>
                    )}
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item as='span' icon={HiArrowRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default DashboardSidebar;
