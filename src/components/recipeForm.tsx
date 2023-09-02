import { Button, FormGroup, Grid, InputLabel, TextField } from "@mui/material";
import {
	CreateRecipeInterface,
	EditRecipeInterface,
} from "../interfaces/Recipe";

interface RecipeFormProps {
	recipe: CreateRecipeInterface | EditRecipeInterface;
	buttonText: string;
	onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onFormChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
	onFormChange,
	onFormSubmit,
	recipe,
	buttonText,
}) => {
	return (
		<Grid
			container
			spacing={1}
			sx={{
				textAlign: "center",
				alignContent: "center",
				justifyContent: "center",
			}}
		>
			<form onSubmit={onFormSubmit}>
				<FormGroup>
					<Grid item>
						<InputLabel>Title</InputLabel>
						<TextField
							required
							fullWidth
							name="title"
							value={recipe?.title}
							onChange={onFormChange}
						/>
						<InputLabel>Ingredients</InputLabel>
						<TextField
							required
							name="ingredients"
							multiline
							maxRows={10}
							value={recipe?.ingredients}
							sx={{ width: "400px" }}
							onChange={onFormChange}
						/>
						<InputLabel>Instructions</InputLabel>
						<TextField
							required
							name="instructions"
							multiline
							maxRows={10}
							sx={{ width: "400px" }}
							value={recipe?.instructions}
							onChange={onFormChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							size="large"
							color="success"
							variant="contained"
						>
							{buttonText}
						</Button>
					</Grid>
				</FormGroup>
			</form>
		</Grid>
	);
};

export default RecipeForm;
