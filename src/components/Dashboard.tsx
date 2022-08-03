import { ReactElement, useEffect, useState } from "react";
import { FileUploader } from "./FileUploader";
import { Gallery } from "./Gallery";
import { ImagePreview } from "./ImagePreview";
import { useClassifyBreed } from "../hooks/useClassifyBreed";
import { BASE_URL } from "../services/Dogs";
import useFetch from "../hooks/useFetch";
import { BreedResponse, ImageByBreedResponse } from "../typings";
import { BreedImages } from "./BreedImages";
import { findExactBreed } from "../utils";
import { Loading } from "./Loading";
import { Alert } from "./Alert";
import "../styles/Dashboard.scss";

function Dashboard() {
	const { data, error } = useFetch<BreedResponse>(
		`${BASE_URL}/breeds/list/all`
	);
	const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
		null
	);
	const [prediction, predictionError, loader] =
		useClassifyBreed(uploadedImage);
	const [dogBreed, setDogBreed] = useState<string | null>(null);
	const [images, setImages] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [stateError, setStateError] = useState(!!error);

	useEffect(() => {
		setLoading(loader);
		if (prediction && data) {
			const breed = findExactBreed(prediction.className, data.message);
			if (!breed) {
				setStateError(true);
			} else {
				setDogBreed(breed);
			}
		}
		if (predictionError) {
			setStateError(!!predictionError);
		}
	}, [predictionError, prediction, data, loader]);

	const renderImage = (): ReactElement => {
		return uploadedImage ? (
			<ImagePreview image={uploadedImage} />
		) : (
			<h2>Upload your image</h2>
		);
	};

	const resetState = () => {
		setUploadedImage(null);
		setDogBreed(null);
		setImages([]);
		setStateError(false);
		setLoading(false);
	};

	const renderState = (): ReactElement | null => {
		if (loading) {
			return <Loading />;
		}
		if (stateError) {
			return (
				<Alert message="We couldn't recognize your dog, please try with different image." />
			);
		}
		if (dogBreed) {
			return (
				<>
					<BreedImages
						breed={dogBreed}
						onSuccess={(data: ImageByBreedResponse) =>
							setImages(data.message)
						}
						onFailure={() => setStateError(true)}
					/>
					<div className="gallery-container">
						<Gallery images={images} />
					</div>
				</>
			);
		}
		return null;
	};
	return (
		<div className="dashboard-container">
			<div className="image-upload-area">
				{renderImage()}
				<FileUploader
					onSuccess={(data) => setUploadedImage(data)}
					onClear={() => resetState()}
				/>
			</div>
			<div className="dashboard-content">{renderState()}</div>
		</div>
	);
}

export default Dashboard;
