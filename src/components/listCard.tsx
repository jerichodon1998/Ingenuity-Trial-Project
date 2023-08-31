import { Box, Grid } from "@mui/material";
import CustomCard from "../components/recipeCard";
import { RecipeInterface } from "../interfaces/Recipe";

interface ListCardInterface {
	recipes: RecipeInterface[];
}

const ListCard: React.FC<ListCardInterface> = ({ recipes }) => {
	return (
		<Box flexGrow={1} padding={{ xs: 10, sm: 10, md: 5, lg: 5 }}>
			<Grid container spacing={2}>
				{recipes.map((recipe) => {
					return <CustomCard key={recipe.id} recipe={recipe} />;
				})}
			</Grid>
		</Box>
	);
};

export default ListCard;
