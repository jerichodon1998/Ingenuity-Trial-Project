import {
	Box,
	FormGroup,
	Typography,
	Grid,
	TextField,
	Button,
	Alert,
} from "@mui/material";
import { UserCredentialInterface } from "../interfaces/User";

interface CustomAuthFormProps {
	text: string;
	errorMessage?: string;
	userCredential: UserCredentialInterface;
	onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onFormChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const CustomAuthForm: React.FC<CustomAuthFormProps> = ({
	onFormChange,
	onFormSubmit,
	text,
	userCredential,
	errorMessage,
}) => {
	const renderError = (): JSX.Element | null => {
		return errorMessage ? (
			<Grid item>
				<Alert severity="error">{errorMessage}</Alert>
			</Grid>
		) : null;
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
							{text}
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
							{renderError()}
						</Grid>
						<Button type="submit">Submit</Button>
					</FormGroup>
				</form>
			</Grid>
		</Box>
	);
};

export default CustomAuthForm;
