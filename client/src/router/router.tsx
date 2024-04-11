import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CompetitionsPage from '../pages/CompetitionsPage';
import TeamsPage from '../pages/TeamsPage';
// import CompetitionsPage from '../pages/CompetitionsPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'leagues',
				element: <CompetitionsPage />,
			},
			{
				path: 'teams',
				element: <TeamsPage />,
			},
		],
	},
]);
