export interface IActionCreators {
	competitionsAction: () => void;
	teamsAction: () => void;
}
export interface IActionCreatorsById {
	competitionMatchesAction: (id: number) => void;
	teamMatchesAction: (id: number) => void;
}
export interface IActionCreatorsByDate {
	teamMatchesByDateAction: (data: IParamsDate) => void;
	competitionMatchesByDateAction: (data: IParamsDate) => void;
}

export interface IParamsDate {
	id: number;
	dateFrom: string;
	dateTo: string;
}
