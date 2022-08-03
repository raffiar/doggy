export interface Prediction {
	className: string;
	probability: number;
}

export interface BreedResponse {
	message: BreedList;
	status: string;
}

export interface BreedList {
	[key: string]: string[];
}
export interface ImageByBreedResponse {
	message: string[];
	status: string;
}
