import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FileUploader } from "../components/FileUploader";

const props = {
	onSuccess: jest.fn(),
	onClear: jest.fn(),
};

describe("FileUploader", () => {
	it("renders initial state of FileUploader", () => {
		render(<FileUploader {...props} />);
		expect(screen.getByText(/Choose file/i)).toBeInTheDocument();
	});

	it("renders file and clear button on file upload", () => {
		const file = new File([new ArrayBuffer(100)], "chucknorris.png", {
			type: "image/png",
		});
		const { getByLabelText } = render(<FileUploader {...props} />);
		global.URL.createObjectURL = jest.fn().mockReturnValue("test");
		fireEvent.change(getByLabelText(/Choose file/i), {
			target: {
				files: [file],
			},
		});
		expect(screen.getByText("Clear")).toBeInTheDocument();
		expect(props.onSuccess.mock.calls.length).toBe(1);
	});

	it("renders initial state after clearing input", () => {
		const file = new File([new ArrayBuffer(100)], "chucknorris.png", {
			type: "image/png",
		});
		const { getByLabelText } = render(<FileUploader {...props} />);
		global.URL.createObjectURL = jest.fn().mockReturnValue("test");
		fireEvent.change(getByLabelText(/Choose file/i), {
			target: {
				files: [file],
			},
		});
		fireEvent.click(screen.getByText("Clear"), {});

		expect(props.onClear.mock.calls.length).toBe(1);
	});

	it("renders validation message when file is too large", () => {
		const file = new File([new ArrayBuffer(10000000)], "chucknorris.png", {
			type: "image/png",
		});
		const { getByLabelText } = render(<FileUploader {...props} />);
		fireEvent.change(getByLabelText(/Choose file/i), {
			target: {
				files: [file],
			},
		});
		expect(
			screen.getByText(
				"File is too big, please select a file less than 4MB"
			)
		).toBeInTheDocument();
	});
});
