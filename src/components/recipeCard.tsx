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
import { Link } from "react-router-dom";
interface RecipeCardProps {
	recipe: RecipeInterface;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	const textTruncation = (text: string): string => {
		return text.length > 100 ? text.substring(0, 97) + "..." : text;
	};

	return (
		<Card
			sx={{
				width: "auto",
				height: 350,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CardMedia sx={{ height: 140 }} image={defaultImage} title="image" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{textTruncation(recipe.title)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{textTruncation(recipe.ingredients)}
				</Typography>
			</CardContent>
			<CardActions sx={{ marginTop: "auto" }}>
				<Button size="small">
					<Link
						to={`/recipes/${recipe.id}`}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						Learn More
					</Link>
				</Button>
			</CardActions>
		</Card>
	);
};

export default RecipeCard;
