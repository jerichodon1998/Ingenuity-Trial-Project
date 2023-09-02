import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeInterface } from "../interfaces/Recipe";
import {
	onSnapshot,
	doc,
	DocumentSnapshot,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import {
	Box,
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import defaultImage from "../assets/defaultImage.jpg";
import EditRecipeModal from "../components/editRecipeModal";
import { useAppSelector } from "../redux/app/hooks";
const Recipe: React.FC = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<RecipeInterface>();
	const authState = useAppSelector((state) => state.authentication);
	const navigate = useNavigate();

	const onDeleteRecipe = async (): Promise<void> => {
		if (confirm("test")) {
			const documentRef = doc(db, "recipe/" + recipe?.id);
			try {
				await deleteDoc(documentRef).then(() => {
					navigate("/");
				});
			} catch (error) {
				alert(error);
			}
		}
	};

	const renderOptions = (): JSX.Element | null => {
		if (
			authState.isLoggedIn &&
			authState.userData?.uid == recipe?.owner &&
			recipe
		) {
			return (
				<CardActions sx={{ marginTop: "auto" }}>
					<Grid container spacing={2}>
						<Grid item>
							<EditRecipeModal
								ingredients={recipe.ingredients}
								title={recipe.title}
								instructions={recipe.instructions}
							/>
						</Grid>
						<Grid item>
							<Button
								onClick={onDeleteRecipe}
								variant="outlined"
								color="error"
								size="large"
							>
								Delete
								<Delete color="error" fontSize="inherit" />
							</Button>
						</Grid>
					</Grid>
				</CardActions>
			);
		}
		return null;
	};

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
						owner: docSnapshot.data()?.owner,
					});
				}
			});
		};
		getRecipe();
	}, [id]);

	const renderRecipe = (): JSX.Element => {
		return recipe ? (
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
				{renderOptions()}
			</Card>
		) : (
			<Typography>Recipe doesn't exist or it has been deleted</Typography>
		);
	};

	return (
		<Box flexGrow={1} padding={{ xs: 5, sm: 5, md: 10, lg: 10 }}>
			{renderRecipe()}
		</Box>
	);
};

export default Recipe;
