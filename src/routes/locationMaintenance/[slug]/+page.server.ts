import { _fetchData, _addData, _updateData } from "../+page.server.js";
import type { Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema, type Location } from "../locationMaintenanceSchema";
import { fail } from "@sveltejs/kit";

export async function load({ params }) {
    let id: number = +params.slug;

    if (id != 0) {
        const locations: Location[] = await _fetchData(id);
        const data = formSchema.parse(locations);
        return {
            form: await superValidate(data, formSchema)
        };
    }
    return {
        form: await superValidate(formSchema)
    }
}

export const actions = {
    submit: async (event) => {
        const form = await superValidate(event, formSchema);
        if (!form.valid) {
            return fail(400, {
                form
            });
        } else if (!form.data.location_id) {
            _addData(form.data);
        } else {
            _updateData(form.data);
        }
    }
} satisfies Actions;