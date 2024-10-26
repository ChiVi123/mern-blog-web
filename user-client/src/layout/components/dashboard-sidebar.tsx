import { Sidebar } from 'flowbite-react';
import { HiArrowRight, HiUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '~core/store';
import { userActions } from '~modules/user';
import { fetchSignOut } from '~modules/user/async';

function DashboardSidebar() {
    const dispatch = useAppDispatch();

    const handleSignOut = async () => {
        dispatch(userActions.reset());
        await dispatch(fetchSignOut());
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <NavLink to='/dashboard/profile'>
                        {({ isActive }) => (
                            <Sidebar.Item as='div' active={isActive} icon={HiUser} label='User' labelColor='dark'>
                                Profile
                            </Sidebar.Item>
                        )}
                    </NavLink>
                    <Sidebar.Item as='span' icon={HiArrowRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default DashboardSidebar;
