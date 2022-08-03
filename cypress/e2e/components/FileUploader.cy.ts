describe("FileUploader spec", () => {
	const picture = "cypress/fixtures/doggy.jpeg";

	it("passes", () => {
		cy.visit("http://localhost:3000/");
	});

	it("displays info text and have upload button", () => {
		cy.get(".image-upload-area h2").should(
			"have.text",
			"Upload your image"
		);
		cy.get(".dashboard-container .input-container label").should(
			"have.text",
			"Choose File"
		);
	});

	it("uploads image file", () => {
		cy.get(".dashboard-container .input-container label").selectFile(
			picture
		);
		cy.get(".input-container button").should("have.text", "Clear");
	});

	it("clears input after pressing clear button", () => {
		cy.get(".dashboard-container .input-container label").selectFile(
			picture
		);
		cy.get(".input-container button").click();
		cy.get(".input-container button").should("not.exist");
	});
});
