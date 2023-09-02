import { Box, Modal, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EditRecipeInterface } from "../interfaces/Recipe";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import RecipeForm from "./recipeForm";

const EditRecipeModal: React.FC<EditRecipeInterface> = ({
	ingredients,
	instructions,
	title,
}) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [editRecipe, setEditRecipe] = useState<EditRecipeInterface>();
	const { id } = useParams();

	const onFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		// update document
		const documentRef = doc(db, "recipe/" + id);
		try {
			await setDoc(documentRef, editRecipe, { merge: true });
			handleClose();
		} catch (error) {
			alert(error);
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
			setEditRecipe({ ingredients, instructions, title });
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
					{editRecipe ? (
						<RecipeForm
							buttonText="Save"
							onFormChange={onFormChange}
							onFormSubmit={onFormSubmit}
							recipe={editRecipe}
						/>
					) : null}
				</Box>
			</Modal>
		</div>
	);
};

export default EditRecipeModal;
