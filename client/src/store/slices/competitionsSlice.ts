// const initialState

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CompetitionsService } from '../../services/competitions/competitions.service';

const initialState = {
	data: {},
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
		builder.addCase(allCompetitions.fulfilled, (state, action) => {
			state.data = { ...state.data, ...action.payload.data };
		});
	},
});

// export const { setUser } = userSlice.reducer;

export default competitionsSlice.reducer;
