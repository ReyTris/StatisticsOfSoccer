import {
	allCompetitions,
	allTeams,
	competitionMatches,
	competitionMatchesDate,
	teamMatches,
	teamMatchesDate,
} from './competitionsSlice';

export const actionCreators = {
	competitionsAction: allCompetitions,
	competitionMatchesAction: competitionMatches,
	teamsAction: allTeams,
	teamMatchesAction: teamMatches,
	teamMatchesByDateAction: teamMatchesDate,
	competitionMatchesByDateAction: competitionMatchesDate,
};
