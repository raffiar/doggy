import { ChangeEvent, useRef, useState } from "react";
import { Alert } from "./Alert";

interface FileUploaderProps {
	onSuccess: (data: HTMLImageElement | null) => void;
	onClear(): void;
}

export const FileUploader = (props: FileUploaderProps) => {
	const [image, setImage] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [validationMessage, setValidationMessage] = useState<string | null>(
		null
	);

	const onFileUpload = (ev: ChangeEvent) => {
		const target = ev.target as HTMLInputElement;
		if (target && target.files) {
			const file = target.files[0];
			if (Math.round(file.size / 1024) >= 4096) {
				clearInput();
				return setValidationMessage(
					"File is too big, please select a file less than 4MB"
				);
			}
			if (validationMessage) {
				setValidationMessage(null);
			}
			const src = URL.createObjectURL(file);
			selectImage(src);
		}
	};

	const selectImage = (src: string | null) => {
		setImage(src);
		const imageItem = new Image();
		if (src?.length) {
			imageItem.src = src;
		}
		src ? props.onSuccess(imageItem) : props.onClear();
	};

	const clearInput = () => {
		if (inputRef && inputRef.current) {
			inputRef.current.value = "";
		}
		selectImage(null);
	};

	return (
		<div className="file-input-selector">
			{validationMessage ? (
				<div className="validation-message">
					<Alert message={validationMessage} />
				</div>
			) : null}
			<div className="input-container">
				<label htmlFor="fileUpload" className="image-upload-button">
					Choose File
				</label>
				<input
					id="fileUpload"
					ref={inputRef}
					type="file"
					onChange={onFileUpload}
					accept="image/*"
					hidden
				/>
				{image ? (
					<button
						className="clear-button"
						onClick={() => clearInput()}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
};
