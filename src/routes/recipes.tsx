import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeInterface } from "../interfaces/Recipe";
import { onSnapshot, doc, DocumentSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import defaultImage from "../assets/defaultImage.jpg";
const Recipe: React.FC = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<RecipeInterface>();
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getRecipe = (): void => {
			if (!id) {
				return;
			}
			const docRef = doc(db, "recipe", id);
			onSnapshot(docRef, (docSnapshot: DocumentSnapshot): void => {
				// This callback will be called whenever the document changes.
				// You can access the updated document data using docSnapshot.data()
				if (docSnapshot.exists()) {
					setRecipe({
						id: docSnapshot.id,
						title: docSnapshot.data().title,
						createdAt: docSnapshot.data().createdAt,
						ingredients: docSnapshot.data().ingredients,
						instructions: docSnapshot.data().instructions,
					});
				}
			});
		};
		getRecipe();
	}, [id]);

	const renderRecipe = (): JSX.Element => {
		return (
			<Card
				sx={{
					width: "fill",
					height: "fill",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<CardMedia sx={{ height: 240 }} image={defaultImage} title="image" />
				<CardContent>
					<Typography
						gutterBottom
						variant="h2"
						component="div"
						fontWeight="medium"
					>
						{recipe?.title}
					</Typography>
					<Typography variant="h4" color="text.primary">
						Ingredients
					</Typography>
					<Typography variant="body1" color="text.primary">
						{recipe?.ingredients}
					</Typography>
					<Typography variant="h4" color="text.primary">
						Instructions
					</Typography>
					<Typography variant="body1" color="text.primary">
						{recipe?.instructions}
					</Typography>
				</CardContent>
			</Card>
		);
	};

	return (
		<Box flexGrow={1} padding={{ xs: 5, sm: 5, md: 10, lg: 10 }}>
			{recipe ? renderRecipe() : null}
		</Box>
	);
};

export default Recipe;
