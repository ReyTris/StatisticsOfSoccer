import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import AuthPage from './pages/AuthPage/AuthPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [],
	},
	{
		path: '/auth',
		element: <AuthPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
