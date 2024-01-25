import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./locationMaintenanceSchema";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { Location } from "./location"

const data: Location[] = [];

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

        // const fetchedData: Location[] = await response.json();
        const fetchedData = await response.json();
        console.log(fetchedData.data);
        const location: Location[] = fetchedData.data;
        data.push(...location);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
    
export const load: PageServerLoad = async () => {
    
    fetchData();

    return {
        form: await superValidate(formSchema),
        locationList: data,
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