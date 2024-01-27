import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./locationMaintenanceSchema";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { Location } from "./location"

async function fetchData() {
    const apiUrl = 'http://192.168.110.152:9000/testjdbc/location/getLocation';
    const headers = new Headers({
        'Content-Type': 'application/json',
        'mt-entity-code': 'MTMH'
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        const location: Location[] = fetchedData.data;
        return location;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return [];
}
    
export const load: PageServerLoad = async () => {
    
    const location = await fetchData();

    return {
        form: await superValidate(formSchema),
        locationList: location,
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, formSchema);
        if (!form.valid) {
            return fail(400, {
                form
            });
        }
        return {
            form
        };
    }
};