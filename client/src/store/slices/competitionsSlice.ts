// const initialState

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICompetition } from '../../models/response/ICompetitionsResponse';
import { CompetitionsService } from '../../services/competitions/competitions.service';

const initialState = {
	loading: false,
	data: [] as ICompetition[],
	matches: [],
};

export const allCompetitions = createAsyncThunk(
	'competitions/all',
	async (_, { rejectWithValue }) => {
		try {
			const response = await CompetitionsService.getAllCompetitions();

			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
export const competitionsMatches = createAsyncThunk(
	'competitions/matches',
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await CompetitionsService.getCompetitionMatches(id);

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
			state.data = action.payload.data.competitions;
		});
		builder.addCase(competitionsMatches.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(competitionsMatches.fulfilled, (state, action) => {
			state.loading = false;
			state.matches = action.payload.data.matches;
		});
	},
});

export default competitionsSlice.reducer;
