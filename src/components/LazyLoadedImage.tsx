import { useEffect, useRef, useState } from "react";
import loader from "../assets/oval.svg";

interface LazyLoadedImageProps {
	image: string;
}
export const LazyLoadedImage = (props: LazyLoadedImageProps) => {
	const lazyImage = useRef<HTMLImageElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const loadLazy = () => {
		if (lazyImage) {
			if (IntersectionObserver) {
				const imageObserver = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting) {
						const image = entries[0].target as HTMLImageElement;
						image.src = image.dataset.src as string;
						imageObserver.unobserve(image);
						setIsLoading(false);
					}
				});
				imageObserver.observe(lazyImage.current as HTMLImageElement);
			} else {
				if (lazyImage && lazyImage.current) {
					lazyImage.current.src = lazyImage.current?.dataset
						.src as string;
					setIsLoading(false);
				}
			}
		}
	};
	useEffect(() => {
		loadLazy();
	}, [lazyImage]);
	return (
		<img
			src={loader}
			data-src={props.image}
			alt={"dog"}
			className={isLoading ? "lazy-load" : "gallery-image"}
			ref={lazyImage}
		/>
	);
};
