import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/app/hooks";
import {
	DocumentData,
	DocumentSnapshot,
	QuerySnapshot,
	collection,
	doc,
	getCountFromServer,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Box, Grid } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AdminDataCard from "../components/adminDataCard";
import { RecipeInterface } from "../interfaces/Recipe";
import ListCard from "../components/listCard";

const Admin: React.FC = () => {
	const authState = useAppSelector((state) => state.authentication);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [totalRecipes, setTotalRecipes] = useState<number>(0);
	const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
	const totalUserIdRef = import.meta.env.VITE_TotalUserIdRef;

	const renderData = (): JSX.Element | null => {
		return authState.isAdmin ? (
			<>
				<AdminDataCard
					text="Total Users"
					data={totalUsers}
					iconComponent={<GroupIcon height={24} width={24} />}
				/>
				<AdminDataCard
					text="Total Recipes"
					data={totalRecipes}
					iconComponent={<MenuBookIcon />}
				/>
			</>
		) : (
			<h1>Unauthorized</h1>
		);
	};

	const renderRecipes = (): JSX.Element => {
		return <ListCard recipes={recipes} />;
	};

	useEffect(() => {
		const fetchTotalUsers = (): void => {
			const docRef = doc(db, "totalUsers", totalUserIdRef);
			onSnapshot(docRef, (docSnapshot: DocumentSnapshot): void => {
				if (docSnapshot.exists()) {
					setTotalUsers(docSnapshot.data().totalUsers);
				}
			});
		};

		const getRecipeCount = async () => {
			const collectionRef = collection(db, "recipe");
			await getCountFromServer(collectionRef).then((doc) => {
				setTotalRecipes(doc.data().count);
			});
		};

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
		getRecipeCount();
		fetchTotalUsers();
	}, []);

	return (
		<Box flexGrow={1} padding={{ xs: 5, sm: 5, md: 10, lg: 10 }}>
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				{renderData()}
				{renderRecipes()}
			</Grid>
		</Box>
	);
};

export default Admin;
