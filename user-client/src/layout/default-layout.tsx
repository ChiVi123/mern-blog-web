import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components';

function DefaultLayout() {
    return (
        <>
            <Header />

            <Suspense fallback={<p>loading...</p>}>
                <Outlet />
            </Suspense>
        </>
    );
}

export default DefaultLayout;
