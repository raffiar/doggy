export const BASE_URL = "https://dog.ceo/api";

export async function getRandomDog() {
	try {
		const data = await fetch(`${BASE_URL}/breeds/image/random`);
		return data.json();
	} catch (err: unknown) {
		return err;
	}
}

export async function getImagesByBreed(breed: string) {
	try {
		const data = await fetch(`${BASE_URL}breed/${breed}/images`);
		return data.json();
	} catch (err: unknown) {
		return err;
	}
}

export async function getAllBreeds() {
	try {
		const data = await fetch(`${BASE_URL}/breeds/list/all`);
		return data.json();
	} catch (err: unknown) {
		return err;
	}
}
