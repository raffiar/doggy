import { useRef } from "react";
import "../styles/ImagePreview.scss";
export interface ImagePreviewProps {
	image: HTMLImageElement;
}
export const ImagePreview = (props: ImagePreviewProps) => {
	const { image } = props;
	const imageRef = useRef<HTMLImageElement>(null);

	return (
		<>
			{image ? (
				<div className="image-preview">
					<img
						ref={imageRef}
						src={image.src}
						alt="file-upload"
						loading="lazy"
					/>
				</div>
			) : null}
		</>
	);
};
