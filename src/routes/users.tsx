import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { db } from "../firebase/firebaseConfig";
import {
	DocumentData,
	QuerySnapshot,
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { RecipeInterface } from "../interfaces/Recipe";
import ListCard from "../components/listCard";
import { Box, Typography } from "@mui/material";

const Users: React.FC = () => {
	const authState = useAppSelector((state) => state.authentication);
	const [recipes, setRecipes] = useState<RecipeInterface[]>([]);

	useEffect(() => {
		const getAllRecipes = async () => {
			const myQuery = query(
				collection(db, "recipe"),
				where("owner", "==", authState.userData?.uid),
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
							owner: doc.data().owner,
						};
					}
				);
				setRecipes(newData);
			});
		};
		if (authState.userData?.uid) {
			getAllRecipes();
		}
	}, [authState.userData?.uid]);

	const renderRecipes = (): JSX.Element => {
		return <ListCard recipes={recipes} />;
	};

	return (
		<Box flexGrow={1} padding={{ xs: 5, sm: 5, md: 10, lg: 10 }}>
			<Typography variant="h4" sx={{ textAlign: "center" }}>
				Welcome, {authState.userData?.email}!
			</Typography>
			{renderRecipes()}
		</Box>
	);
};

export default Users;
