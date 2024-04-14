import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CompetitionsPage from '../pages/CompetitionsPage';
import DetailPage from '../pages/DetailPage/DetailPage';
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
				children: [],
			},
			{
				path: 'teams',
				element: <TeamsPage />,
			},

			{
				path: 'leagues/:id',
				element: <DetailPage />,
			},
		],
	},
]);
