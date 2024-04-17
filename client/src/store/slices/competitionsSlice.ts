// const initialState

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IMatch } from '../../models/response/ICompetitionsMatches';
import { ICompetition } from '../../models/response/ICompetitionsResponse';
import { ITeamResponse } from '../../models/response/ITeamResponse';
import { CompetitionsService } from '../../services/competitions/competitions.service';
import { IParamsDate } from './types';

export interface IInitialState {
	loading: boolean;
	data: IInitialStateData;
}

export interface IInitialStateData {
	competitions: ICompetition[];
	matches: IMatch[];
	teams: ITeamResponse[];
	nameTeam: string;
}

const initialState: IInitialState = {
	loading: false,
	data: {
		competitions: [],
		matches: [],
		teams: [],
		nameTeam: '',
	},
};

export const allCompetitions = createAsyncThunk<
	AxiosResponse<any, any>,
	undefined
>('competitions/all', async (_, { rejectWithValue }) => {
	try {
		const response = await CompetitionsService.getAllCompetitions();

		return response;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error);
	}
});
export const competitionMatches = createAsyncThunk<
	AxiosResponse<any, any>,
	number
>('competitions/matches', async (id: number, { rejectWithValue }) => {
	try {
		const response = await CompetitionsService.getCompetitionMatches(id);

		return response;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error);
	}
});

export const allTeams = createAsyncThunk<AxiosResponse<any, any>, undefined>(
	'competitions/teams',
	async (_, { rejectWithValue }) => {
		try {
			const response = await CompetitionsService.getAllTeams();

			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
export const teamMatches = createAsyncThunk<AxiosResponse<any, any>, number>(
	'competitions/teamMatches',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await CompetitionsService.getTeamMatches(id);

			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
export const teamMatchesDate = createAsyncThunk<AxiosResponse<any, any>, any>(
	'competitions/teamMatchesDate',
	async (data: IParamsDate, { rejectWithValue }) => {
		const { id, dateFrom, dateTo } = data;
		try {
			const response = await CompetitionsService.getTeamMatchesDate(
				id,
				dateFrom,
				dateTo
			);

			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
export const competitionMatchesDate = createAsyncThunk<
	AxiosResponse<any, any>,
	any
>(
	'competitions/competitionMatchesDate',
	async (data: IParamsDate, { rejectWithValue }) => {
		const { id, dateFrom, dateTo } = data;
		try {
			const response = await CompetitionsService.getCompetitionMatchesDate(
				id,
				dateFrom,
				dateTo
			);

			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const competitionsSlice = createSlice({
	name: 'competitions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(allCompetitions.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(allCompetitions.fulfilled, (state, action) => {
			state.loading = false;
			state.data.competitions = action.payload.data.competitions;
		});
		builder.addCase(competitionMatches.pending, (state) => {
			state.loading = true;
			state.data.matches = [];
		});
		builder.addCase(competitionMatches.fulfilled, (state, action) => {
			state.loading = false;
			state.data.matches = action.payload.data.matches;
			state.data.nameTeam = action.payload.data.competition.name;
		});
		builder.addCase(allTeams.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(allTeams.fulfilled, (state, action) => {
			state.loading = false;
			state.data.teams = action.payload.data.teams;
		});
		builder.addCase(teamMatches.pending, (state) => {
			state.loading = true;
			state.data.matches = [];
		});
		builder.addCase(teamMatches.fulfilled, (state, action) => {
			state.loading = false;
			state.data.matches = action.payload.data.matches;
		});
		builder.addCase(teamMatchesDate.pending, (state) => {
			state.loading = true;
			state.data.matches = [];
		});
		builder.addCase(teamMatchesDate.fulfilled, (state, action) => {
			state.loading = false;
			state.data.matches = action.payload.data.matches;
		});
		builder.addCase(competitionMatchesDate.pending, (state) => {
			state.loading = true;
			state.data.matches = [];
		});
		builder.addCase(competitionMatchesDate.fulfilled, (state, action) => {
			state.loading = false;
			state.data.matches = action.payload.data.matches;
		});
	},
});

export default competitionsSlice.reducer;
