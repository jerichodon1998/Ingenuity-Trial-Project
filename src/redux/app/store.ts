import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "../features/authentication/authenticationSlice";

export const store = configureStore({
	reducer: {
		authentication: authenticationSlice,
	},
	devTools: import.meta.env.VITE_ENVIRONMENT !== "production" ? true : false,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
