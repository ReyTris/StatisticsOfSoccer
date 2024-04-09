import { configureStore } from '@reduxjs/toolkit';

import competitionsReducer from './slices/competitionsSlice';

export const store = configureStore({
	reducer: {
		competitionsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
