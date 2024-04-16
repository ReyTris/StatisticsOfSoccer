import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CompetitionsPage from '../pages/CompetitionsPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import TeamMatchesPage from '../pages/TeamMatchesPage/TeamMatchesPage';
import TeamsPage from '../pages/TeamsPage';
export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'competitions',
				element: <CompetitionsPage />,
				children: [],
			},
			{
				path: 'teams',
				element: <TeamsPage />,
			},

			{
				path: 'competitions/:id',
				element: <DetailPage />,
			},
			{
				path: 'teams/:id',
				element: <TeamMatchesPage />,
			},
		],
	},
]);
