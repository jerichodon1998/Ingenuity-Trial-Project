import { useState } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { Box, Typography } from "@mui/material";
import RecipeForm from "../components/recipeForm";
import { CreateRecipeInterface } from "../interfaces/Recipe";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateRecipe: React.FC = () => {
	const authState = useAppSelector((state) => state.authentication);
	const navigate = useNavigate();
	const recipeInitialState: CreateRecipeInterface = {
		ingredients: "",
		instructions: "",
		title: "",
		createdAt: Timestamp.now(),
	};
	const [recipe, setRecipe] =
		useState<CreateRecipeInterface>(recipeInitialState);

	const resetValues = () => {
		setRecipe(recipeInitialState);
	};

	const onFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		// add ownerID and createdAt timestamp
		if (authState?.userData?.uid) {
			setRecipe({
				...recipe,
				createdAt: Timestamp.now(),
				owner: authState.userData.uid,
			});

			// add document
			await addDoc(collection(db, "recipe"), recipe)
				.then(() => {
					resetValues();
				})
				.catch((error) => {
					alert(error);
				});
		} else {
			navigate("/login");
		}
	};

	const onFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setRecipe({
			...recipe,
			[name]: value,
		});
	};

	return (
		<Box>
			<Typography variant="h2">Create Recipe</Typography>
			<RecipeForm
				buttonText="Create"
				onFormChange={onFormChange}
				onFormSubmit={onFormSubmit}
				recipe={recipe}
			/>
		</Box>
	);
};

export default CreateRecipe;
