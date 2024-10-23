import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { themeSelectors } from '~modules/theme';

function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useSelector(themeSelectors.data);

    return (
        <div className={theme}>
            <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
                {children}
            </div>
        </div>
    );
}

export default ThemeProvider;
