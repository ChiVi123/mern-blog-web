import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '~components';
import { persistor, store } from '~core/store';
import { browserRouter } from '~routers/browser-router';

function App() {
    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <ThemeProvider>
                    <RouterProvider router={browserRouter} />
                </ThemeProvider>
            </Provider>
        </PersistGate>
    );
}

export default App;
