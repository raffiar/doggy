import { ReactElement } from "react";
import { LazyLoadedImage } from "./LazyLoadedImage";
import "../styles/Gallery.scss";

export interface GalleryProps {
	images: string[];
}

export const Gallery = (props: GalleryProps): ReactElement => {
	return (
		<div className="gallery-container">
			{props.images.map((img, key) => {
				return (
					<div key={key} className="gallery-item">
						<LazyLoadedImage image={img} data-src={img} />
					</div>
				);
			})}
		</div>
	);
};
