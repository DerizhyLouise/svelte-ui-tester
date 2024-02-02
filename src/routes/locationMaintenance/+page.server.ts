import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./locationMaintenanceSchema";
import type { PageServerLoad } from "./$types";
import type { Location } from "./locationMaintenanceSchema"

export async function _fetchData(id?: number) {
    let apiUrl: string;

    if (id == 0 || typeof id === 'undefined') {
        apiUrl = `http://localhost:9000/testjdbc/location/getLocation`;
    } else {
        apiUrl = `http://localhost:9000/testjdbc/location/getLocation/${id}`;
    }
    console.log(apiUrl);
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

export async function _addData(data: any) {
    const apiUrl = `http://localhost:9000/testjdbc/location/addLocation`;
    console.log(apiUrl);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'mt-entity-code': 'MTMH',
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error adding data:', error);
    }
    return [];
}

export async function _updateData(data: any) {
    const apiUrl = `http://localhost:9000/testjdbc/location/updateLocation?locationId=${data.location_id}`;
    data.entity_code = 'MTMH';
    console.log(apiUrl);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'mt-entity-code': 'MTMH',
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
    return [];
}
    
export const load: PageServerLoad = async () => {
    const location: Location[] = await _fetchData();
    return {
        form: await superValidate(formSchema),
        locationList: location,
    };
};