import { allCompetitions, competitionMatches } from './competitionsSlice';


export interface IActionCreators {
	competitionsDispatch: () => void;
	competitionMatchesDispatch: (id: number) => void;
}

export const actionCreators = {
	competitionsDispatch: allCompetitions,
	competitionMatchesDispatch: competitionMatches,
};