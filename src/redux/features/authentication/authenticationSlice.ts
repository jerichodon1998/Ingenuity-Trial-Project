import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/";

import {
	UserCredential,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	AuthError,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { UserCredentialInterface } from "../../../interfaces/UserCredential";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export interface AuthenticationState {
	isLoggedIn: boolean;
	isLoading: boolean;
	isAdmin: boolean;
	userData: User | null | void;
	error: AuthError | null | void | undefined;
}

interface SuccessLogout {
	message: string;
	isSuccess: boolean;
}

const initialState: AuthenticationState = {
	isLoggedIn: false,
	isAdmin: false,
	isLoading: false,
	userData: null,
	error: null,
};

export const userSignin = createAsyncThunk<
	User,
	UserCredentialInterface,
	{ rejectValue: AuthError }
>("users/signin", async (userCredential, thunkApi) => {
	const { email, password } = userCredential;
	const auth = getAuth();
	return await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential: UserCredential): User => {
			// Signed in
			const user = userCredential.user;
			return user;
		})
		.catch((error: AuthError) => {
			return thunkApi.rejectWithValue(error);
		});
});

export const userSignup = createAsyncThunk<
	User,
	UserCredentialInterface,
	{ rejectValue: AuthError }
>(
	"users/signup",
	async (userCredential: UserCredentialInterface, { rejectWithValue }) => {
		const { email, password } = userCredential;
		const auth = getAuth();
		return await createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential: UserCredential): Promise<User> => {
				// add count to userTotal
				const totalUserIdRef = import.meta.env.VITE_TotalUserIdRef;
				const documentRef = doc(db, "totalUsers/" + totalUserIdRef);
				getDoc(documentRef).then(async (docSnapshot) => {
					if (docSnapshot.exists()) {
						// Document exists, you can access its data using docSnapshot.data()
						const totalUsers = docSnapshot.data().totalUsers;

						await updateDoc(documentRef, {
							totalUsers: parseInt(totalUsers) + 1,
						});
					}
				});

				// Signed in
				const user = userCredential.user;
				return user;
			})
			.catch((error: AuthError) => {
				return rejectWithValue(error);
			});
	}
);

export const userLogout = createAsyncThunk<
	SuccessLogout,
	undefined,
	{ rejectValue: AuthError }
>("users/logout", async (_, { rejectWithValue }) => {
	const auth = getAuth();
	return await signOut(auth)
		.then(() => {
			const successLogout: SuccessLogout = {
				isSuccess: true,
				message: "Logged out successfully",
			};
			return successLogout;
		})
		.catch((error: AuthError) => {
			return rejectWithValue(error);
		});
});

export const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		resetAuth: (state) => {
			state.isLoggedIn = false;
			state.isLoading = false;
			state.userData = null;
			state.isAdmin = false;
			state.error = null;
		},
		getCurrentUser: (state, action: PayloadAction<User | null>) => {
			state.isLoggedIn = true;
			state.userData = action.payload;
		},
		setUserAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload;
		},
	},
	extraReducers: (builder) => {
		// fullfiled requests
		builder.addCase(
			userLogout.fulfilled,
			(state, action: PayloadAction<SuccessLogout>) => {
				action.payload;
				state.isLoading = false;
				state.isLoggedIn = false;
				state.userData = null;
				state.isAdmin = false;
			}
		);
		builder.addMatcher(
			isAnyOf(userSignin.fulfilled, userSignup.fulfilled),
			(state, action: PayloadAction<User>) => {
				state.userData = action.payload;
			}
		);
		// pending requests
		builder.addMatcher(
			isAnyOf(userSignin.pending, userLogout.pending, userSignup.pending),
			(state) => {
				state.isLoading = true;
			}
		);
		// rejected requests
		builder.addMatcher(
			isAnyOf(userSignin.rejected, userSignup.rejected, userLogout.rejected),
			// future improvement: find a way to implement this without the undefined
			(state, action: PayloadAction<AuthError | undefined>) => {
				state.isLoading = false;
				state.error = action.payload;
			}
		);
	},
});

export const { resetAuth, getCurrentUser, setUserAdmin } =
	authenticationSlice.actions;

export default authenticationSlice.reducer;
