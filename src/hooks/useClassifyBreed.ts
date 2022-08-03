import * as mobilenet from "@tensorflow-models/mobilenet";
import { useEffect, useState } from "react";
import { Prediction } from "../typings";
export const useClassifyBreed = (
	image: HTMLImageElement | null
): [Prediction | null, unknown, boolean] => {
	const [prediction, setPrediction] = useState<Prediction | null>(null);
	const [error, setError] = useState<unknown>(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const defineModel = async () => {
			setLoading(true);
			const model = await mobilenet.load();
			try {
				const result: Prediction[] = await model.classify(image!);
				const mostClose = result.reduce(
					(prev, current) =>
						prev.probability > current.probability ? prev : current,
					result[0]
				);
				setPrediction(mostClose);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};
		if (image) {
			defineModel();
		}
	}, [image]);

	return [prediction, error, loading];
};
