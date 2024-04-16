import withCompetitionsData from '../hoc/BaseHOC';
import withMatchesData from '../hoc/DetailHOC';
import CompetitionsPage from '../pages/CompetitionsPage';
import DetailPage from '../pages/DetailPage/DetailPage';

export const InitCompetitions = withCompetitionsData(CompetitionsPage)
export const InitCompetitionMatches = withMatchesData(DetailPage)