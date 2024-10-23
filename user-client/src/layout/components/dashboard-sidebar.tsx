import { Sidebar } from 'flowbite-react';
import { HiArrowRight, HiUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

function DashboardSidebar() {
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
                    <Sidebar.Item as='span' icon={HiArrowRight} className='cursor-pointer'>
                        Profile
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default DashboardSidebar;
