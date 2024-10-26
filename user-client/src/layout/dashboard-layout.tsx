import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar, Footer, Header } from './components';

function DashBoardLayout() {
    return (
        <>
            <Header />

            <div className='min-h-screen flex flex-col md:flex-row'>
                <div className='md:w-56'>
                    <DashboardSidebar />
                </div>
                <Suspense fallback={<p>loading...</p>}>
                    <Outlet />
                </Suspense>
            </div>

            <Footer />
        </>
    );
}

export default DashBoardLayout;