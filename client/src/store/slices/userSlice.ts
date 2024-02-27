// const initialState

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/axios';
import { IEmailPassword, IUser } from '../../models/response/IAuthResponse';
import { AuthService } from '../../services/auth/auth.service';

export interface IStateUser {
	user: IUser;
	isAuth: boolean;
}

const initialState: IStateUser = {
	user: {} as IUser,
	isAuth: false,
};

export const loginUser = createAsyncThunk(
	'user/login',
	async ({ email, password }: IEmailPassword, { rejectWithValue }) => {
		try {
			const response = await AuthService.login(email, password);
			
			localStorage.setItem('token', response.data.accessToken);
			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/register',
	async ({ name, email, password }: IEmailPassword, { rejectWithValue }) => {
		try {
			const response = await AuthService.register(email, password, name);
			localStorage.setItem('token', response.data.accessToken);
			return response;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
	try {
		const response = await AuthService.logout();
		localStorage.removeItem('token');
		console.log(response);
	} catch (error) {
		console.log(error);
	}
});

export const checkAuth = createAsyncThunk('user/check', async () => {
	try {
		const response = await axios.get(`${API_URL}/refresh`, {
			withCredentials: true,
		});
		localStorage.setItem('token', response.data.accessToken);
		return response;
	} catch (error) {
		console.log(error);
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.user = action.payload.data.user;
			state.isAuth = true;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.user = action.payload.data.user;
			state.isAuth = true;
		});
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.isAuth = false;
		});
		builder.addCase(checkAuth.fulfilled, (state) => {
			try {
				state.isAuth = true;
			} catch (error) {
				console.log(error);
				
			}
		});
	},
});

// export const { setUser } = userSlice.reducer;

export default userSlice.reducer;
