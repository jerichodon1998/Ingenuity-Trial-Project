import React, { useState } from "react";
import { UserCredentialInterface } from "../interfaces/UserCredential";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
	resetAuth,
	userSignup,
} from "../redux/features/authentication/authenticationSlice";
import CustomAuthForm from "../components/customAuthForm";

const Signup: React.FC = () => {
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.authentication);
	// const [isLoading, setIsloading] = useState<boolean>(false)
	const [userCredential, setUserCredential] = useState<UserCredentialInterface>(
		{ email: "", password: "" }
	);

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// reset auth state before dispatching a userSignup to clear any previous auth data
		dispatch(resetAuth());
		dispatch(userSignup(userCredential));
		e.preventDefault();
	};

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setUserCredential((prevState) => {
			const { name, value } = e.target;
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	return (
		<CustomAuthForm
			onFormChange={onFormChange}
			onFormSubmit={onFormSubmit}
			text="Signup with Email and Password"
			userCredential={userCredential}
			errorMessage={authState.error?.message}
		/>
	);
};

export default Signup;
