import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../services/Dogs";
import { ImageByBreedResponse } from "../typings";

interface BreedImagesProps {
	breed: string;
	onSuccess(data: ImageByBreedResponse): void;
	onFailure(message: string): void;
}
export const BreedImages = (props: BreedImagesProps): null => {
	const { data, error } = useFetch<ImageByBreedResponse>(
		`${BASE_URL}/breed/${props.breed}/images`
	);
	useEffect(() => {
		if (error) {
			props.onFailure("Something went wrong");
		}
		if (data && !error) {
			props.onSuccess(data);
		}
	}, [props, data, error]);
	return null;
};
