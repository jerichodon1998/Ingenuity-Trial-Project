import {
	DocumentData,
	QuerySnapshot,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { RecipeInterface } from "../interfaces/Recipe";
import { Box, Typography } from "@mui/material";
import ListCard from "../components/listCard";

const HomePage: React.FC = () => {
	const [recipes, setRecipes] = useState<RecipeInterface[]>([]);

	const renderRecipes = (): JSX.Element => {
		return <ListCard recipes={recipes} />;
	};

	useEffect(() => {
		const getAllRecipes = () => {
			const myQuery = query(
				collection(db, "recipe"),
				orderBy("createdAt", "asc")
			);
			onSnapshot(myQuery, (snapshot: QuerySnapshot): void => {
				const newData: RecipeInterface[] = snapshot.docs.map(
					(doc: DocumentData): RecipeInterface => {
						return {
							id: doc.id,
							title: doc.data().title,
							createdAt: doc.data().createdAt,
							ingredients: doc.data().ingredients,
							instructions: doc.data().instructions,
						};
					}
				);
				setRecipes(newData);
			});
		};
		getAllRecipes();
	}, []);

	return (
		<Box padding={{ xs: 5, sm: 5, md: 10, lg: 10 }}>
			<Typography variant="h2" sx={{ textAlign: "center" }}>
				HomePage
			</Typography>
			{renderRecipes()}
		</Box>
	);
};

export default HomePage;
