import { Timestamp } from "firebase/firestore";

export interface RecipeInterface {
	id: string;
	title: string;
	createdAt: Timestamp;
	ingredients: string;
	instructions: string;
	owner?: string;
}

export interface CreateRecipeInterface extends EditRecipeInterface {
	createdAt: Timestamp;
	owner?: string;
}

export interface EditRecipeInterface {
	title: string;
	ingredients: string;
	instructions: string;
}
