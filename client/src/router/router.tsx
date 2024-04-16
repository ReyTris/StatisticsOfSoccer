import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import TeamsPage from '../pages/TeamsPage';
import { InitCompetitionMatches, InitCompetitions } from './pagesRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'competitions',
				element: <InitCompetitions  selectorName='competitions' actionName='competitionsDispatch'/>,
				children: [],
			},
			{
				path: 'teams',
				element: <TeamsPage />,
			},

			{
				path: 'competitions/:id',
				element: <InitCompetitionMatches selectorName="matches" actionName="competitionMatchesDispatch"/>,
			},
		],
	},
]);
