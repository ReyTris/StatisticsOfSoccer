import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
