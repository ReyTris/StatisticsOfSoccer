// const initialState

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICompetition } from '../../models/response/ICompetitionsResponse';
import { CompetitionsService } from '../../services/competitions/competitions.service';

const initialState = {
	loading: false,
	data: [] as ICompetition[],
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
	},
});

// export const { setUser } = userSlice.reducer;

export default competitionsSlice.reducer;
