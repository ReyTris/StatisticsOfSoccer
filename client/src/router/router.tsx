import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CompetitionsPage from '../pages/CompetitionsPage';
import TeamsPage from '../pages/TeamsPage';
import { InitMatchesPage } from './pageRoute';
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
				element: (
					<InitMatchesPage
						selectorName="matches"
						actionName="competitionMatchesAction"
						actionNameByDate="competitionMatchesByDateAction"
					/>
				),
			},
			{
				path: 'teams/:id',
				element: (
					<InitMatchesPage
						selectorName="matches"
						actionName="teamMatchesAction"
						actionNameByDate="teamMatchesByDateAction"
					/>
				),
			},
		],
	},
]);
