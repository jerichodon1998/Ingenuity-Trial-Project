import { Box, Grid } from "@mui/material";
import CustomCard from "../components/recipeCard";
import { RecipeInterface } from "../interfaces/Recipe";

interface ListCardInterface {
	recipes: RecipeInterface[];
}

const ListCard: React.FC<ListCardInterface> = ({ recipes }) => {
	return (
		<Box flexGrow={1} padding={{ xs: 10, sm: 10, md: 5, lg: 5 }}>
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				{recipes.map((recipe) => {
					return (
						<Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
							<CustomCard recipe={recipe} />
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default ListCard;
