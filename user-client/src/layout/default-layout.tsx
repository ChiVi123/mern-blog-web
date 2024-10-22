import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components';

function DefaultLayout() {
    return (
        <>
            <Header />

            <Suspense fallback={<p>loading...</p>}>
                <Outlet />
            </Suspense>

            <Footer />
        </>
    );
}

export default DefaultLayout;
