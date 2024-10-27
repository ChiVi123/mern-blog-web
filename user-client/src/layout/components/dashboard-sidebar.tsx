import { Sidebar } from 'flowbite-react';
import { HiArrowRight, HiDocumentText, HiUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch } from '~core/store';
import { userActions, userSelectors } from '~modules/user';
import { fetchSignOut } from '~modules/user/async';

function DashboardSidebar() {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const user = useSelector(userSelectors.data);

    const handleSignOut = async () => {
        dispatch(userActions.reset());
        await dispatch(fetchSignOut());
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to='/dashboard/profile'
                        label={user?.isAdmin ? 'Admin' : 'User'}
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
