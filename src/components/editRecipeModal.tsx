import {
	Box,
	Modal,
	Button,
	Grid,
	TextField,
	InputLabel,
	FormGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { EditRecipeInterface } from "../interfaces/Recipe";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const EditRecipeModal: React.FC<EditRecipeInterface> = ({
	ingredients,
	instructions,
	title,
	id,
}) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [editRecipe, setEditRecipe] = useState<EditRecipeInterface>();

	const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// update document
		const documentRef = doc(db, "recipe/" + id);
		try {
			await setDoc(documentRef, editRecipe, { merge: true });
			handleClose();
			console.log("Document successfully updated!");
		} catch (error) {
			console.error("Error updating document: ", error);
		}
	};

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setEditRecipe((prevState) => {
			const { name, value } = e.target;
			if (prevState) {
				return {
					...prevState,
					[name]: value,
				};
			}
		});
	};

	useEffect(() => {
		if (ingredients && instructions && title) {
			setEditRecipe({ ingredients, instructions, title, id });
		}
	}, [ingredients, instructions, title, id]);

	return (
		<div>
			<Button
				onClick={handleOpen}
				color="success"
				variant="contained"
				size="large"
			>
				Edit Recipe
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						top: "50%",
						left: "50%",
						position: "absolute",
						transform: "translate(-50%, -50%)",
						minWidth: "auto",
						height: "400px",
						bgcolor: "background.paper",
						border: "1px solid #000",
						borderRadius: "10px",
						boxShadow: 24,
						p: 4,
						overflowY: "scroll",
					}}
				>
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
										name="title"
										value={editRecipe?.title}
										onChange={onFormChange}
									/>
									<InputLabel>Ingredients</InputLabel>
									<TextField
										name="ingredients"
										multiline
										maxRows={10}
										value={editRecipe?.ingredients}
										sx={{ width: "400px" }}
										onChange={onFormChange}
									/>
									<InputLabel>Instructions</InputLabel>
									<TextField
										name="instructions"
										multiline
										maxRows={10}
										sx={{ width: "400px" }}
										value={editRecipe?.instructions}
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
										Save
									</Button>
								</Grid>
							</FormGroup>
						</form>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
};

export default EditRecipeModal;
