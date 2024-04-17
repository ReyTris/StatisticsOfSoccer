export interface DetailPageProps {
	dataList: any;
	isLoading: boolean;
	dateHandler: (dateString: string[]) => void;
	nameTeam: string;
}

export interface ITableData {
	key: number;
	date: string;
	time: string;
	status: string;
	homeTeam: ITeam;
	separator: string;
	awayTeam: ITeam;
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

export interface ITeam {
	name: string;
	crest: string;
}
