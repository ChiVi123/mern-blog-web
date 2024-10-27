import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '~components';
import { Footer, Header } from './components';

function DefaultLayout() {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Suspense fallback={<p>loading...</p>}>
                <Outlet />
            </Suspense>
            <Footer />
        </>
    );
}

export default DefaultLayout;
