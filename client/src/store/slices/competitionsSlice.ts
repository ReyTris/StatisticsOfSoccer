// const initialState

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ICompetitionMatch } from '../../models/response/ICompetitionsMatches';
import { ICompetition } from '../../models/response/ICompetitionsResponse';
import { CompetitionsService } from '../../services/competitions/competitions.service';

export interface IInitialState {
	loading: boolean;
	data: IInitialStateData;
}

export interface IInitialStateData {
	competitions: ICompetition[];
	matches: ICompetitionMatch[];
}

const initialState: IInitialState = {
	loading: false,
	data: {
		competitions: [],
		matches: [],
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
		});
		builder.addCase(competitionMatches.fulfilled, (state, action) => {
			state.loading = false;
			state.data.matches = action.payload.data.matches;
		});
	},
});

export default competitionsSlice.reducer;
