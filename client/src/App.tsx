import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import AuthPage from './pages/AuthPage/AuthPage';
import { Login } from './pages/AuthPage/Login';
import { SignUp } from './pages/AuthPage/SignUp';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [],
	},
	{
		path: 'auth',
		element: <AuthPage />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <SignUp />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
