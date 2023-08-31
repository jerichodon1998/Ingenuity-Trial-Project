import { Timestamp } from "firebase/firestore";

export interface RecipeInterface {
	id: string;
	title: string;
	createdAt: Timestamp;
	ingredients: string;
	instructions: string;
}
