interface IArea {
    id: number;
    name: string;
    code: string;
    flag: string | null;
}

interface ICurrentSeason {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: {
        id: number;
        name: string;
        shortName: string;
        tla: string;
        crest: string;
        address: string;
        website: string;
        founded: number;
        clubColors: string;
        venue: string | null;
        lastUpdated: string;
    } | null;
}

export interface ICompetition {
    id: number;
    area: IArea;
    name: string;
    code: string;
    type: string;
    emblem: string;
    plan: string;
    currentSeason: ICurrentSeason;
    numberOfAvailableSeasons: number;
    lastUpdated: string;
}

interface IFilter {
    client: string;
}

export interface ICompetitionsData {
    count: number;
    filters: IFilter;
    competitions: ICompetition[];
}
