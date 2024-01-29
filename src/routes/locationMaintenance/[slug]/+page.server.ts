import { error } from '@sveltejs/kit';
import type { Location } from "../location.js";
import { _fetchData } from "../+page.server";

export async function load({ params }) {
	
	let id: number = +params.slug;

    const locations: Location[] = await _fetchData(id);
	const data = locations.find((location) => location.location_id === id);

	return {
		data
	};
}