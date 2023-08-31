import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
import { RecipeInterface } from "../interfaces/Recipe";
import defaultImage from "../assets/defaultImage.jpg";
interface RecipeCardProps {
	recipe: RecipeInterface;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 140 }} image={defaultImage} title="image" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{recipe.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{recipe.ingredients}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{recipe.instructions}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

export default RecipeCard;
