export interface ITableData {
	key: number;
	date: string;
	time: string;
	status: string;
	homeTeam: string;
	separator: string;
	awayTeam: string;
	score: IScore;
}

export interface IScore {
	fullTime: {
		home: number;
		away: number;
	};
	halfTime: {
		home: number;
		away: number;
	};
	winner: string;
}
