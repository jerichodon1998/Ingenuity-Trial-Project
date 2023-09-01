import {
	Box,
	Button,
	FormGroup,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { UserCredentialInterface } from "../interfaces/User";
import { useAppDispatch } from "../redux/app/hooks";
import {
	resetAuth,
	userSignup,
} from "../redux/features/authentication/authenticationSlice";

const Signup: React.FC = () => {
	const dispatch = useAppDispatch();
	// const authState = useAppSelector(state=>state.authentication)
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
		<Box padding={{ xs: 10, sm: 10, md: 5, lg: 5 }}>
			<Grid
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<form onSubmit={onFormSubmit}>
					<FormGroup
						sx={{
							border: "1px solid #000",
							padding: "20px",
							maxWidth: "340px",
							borderRadius: "20px",
						}}
					>
						<Typography gutterBottom variant="h5" component="div">
							Signup With Email and Password
						</Typography>
						<Grid container spacing={2} justifyContent={"center"}>
							<Grid item>
								<TextField
									required
									type="email"
									placeholder="email"
									name="email"
									onChange={onFormChange}
									value={userCredential.email}
								/>
							</Grid>
							<Grid item>
								<TextField
									required
									type="password"
									placeholder="password"
									name="password"
									onChange={onFormChange}
									value={userCredential.password}
								/>
							</Grid>
						</Grid>
						<Button type="submit">Submit</Button>
					</FormGroup>
				</form>
			</Grid>
		</Box>
	);
};

export default Signup;
