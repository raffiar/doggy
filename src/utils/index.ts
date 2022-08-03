import { BreedList } from "../typings";

function findExactBreed(prediction: string, breeds: BreedList): string {
	const allTypes = prediction.split(" ");
	const selectedTypes = allTypes.filter((type) => breeds[type.toLowerCase()]);
	let dogBreed = "";
	if (selectedTypes.length) {
		dogBreed = selectedTypes[0];
		if (breeds[selectedTypes[0]].length) {
			const finalBreed = breeds[selectedTypes[0]];
			const exactBreed = allTypes.filter(
				(type: string) => finalBreed.indexOf(type.toLowerCase()) > -1
			);
			dogBreed = [
				selectedTypes[0].toLowerCase(),
				exactBreed[0].toLowerCase(),
			].join("/");
		}
	}
	return dogBreed;
}

export { findExactBreed };
