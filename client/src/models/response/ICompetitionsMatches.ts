interface Team {
	id: number;
	name: string;
	shortName: string;
	tla: string;
	crest: string;
}

interface Score {
	winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW';
	duration: 'REGULAR' | 'EXTRA_TIME' | 'PENALTY_SHOOTOUT';
	fullTime: {
		home: number;
		away: number;
	};
	halfTime: {
		home: number;
		away: number;
	};
}

interface Referee {
	id: number;
	name: string;
	type: 'REFEREE';
	nationality: string;
}

export interface ICompetitionMatch {
	area: {
		id: number;
		name: string;
		code: string;
		flag: string;
	};
	competition: {
		id: number;
		name: string;
		code: string;
		type: 'LEAGUE' | 'CUP';
		emblem: string;
	};
	season: {
		id: number;
		startDate: string;
		endDate: string;
		currentMatchday: number;
		winner: string | null;
	};
	id: number;
	utcDate: string;
	status: string;
	matchday: number | null;
	stage: 'REGULAR_SEASON' | string;
	group: string | null;
	lastUpdated: string;
	homeTeam: Team;
	awayTeam: Team;
	score: Score;
	odds?: {
		msg: string;
	};
	referees: Referee[];
}
