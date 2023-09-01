import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserCredentialInterface } from "../interfaces/User";

const Signup: React.FC = () => {
	const [userCredential, setUserCredential] = useState<UserCredentialInterface>(
		{ email: "", password: "" }
	);

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log(e.currentTarget.name);
		setUserCredential((prevState) => ({
			...prevState,
			[e.currentTarget.name]: e.target.value,
		}));
	};

	return (
		<Box flexGrow={1} padding={{ xs: 10, sm: 10, md: 5, lg: 5 }}>
			<Grid
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<FormControl
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
								type="email"
								placeholder="email"
								name="email"
								onChange={onFormChange}
								value={userCredential.email}
							/>
						</Grid>
						<Grid item>
							<TextField
								type="password"
								placeholder="password"
								name="password"
								onChange={onFormChange}
								value={userCredential.password}
							/>
						</Grid>
					</Grid>
				</FormControl>
			</Grid>
		</Box>
	);
};

export default Signup;
