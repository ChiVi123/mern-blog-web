import { RouterProvider } from 'react-router-dom';
import { browserRouter } from '~routers/browser-router';

function App() {
    return <RouterProvider router={browserRouter} />;
}

export default App;
