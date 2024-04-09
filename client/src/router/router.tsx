import { createBrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Layout from '../components/Layout/Layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'competitions',
				element: <Header />,
			},
			{
				path: 'teams',
				element: <Header />,
			},
		],
	},
]);
