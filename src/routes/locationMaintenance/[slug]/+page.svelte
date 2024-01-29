<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { formSchema, type FormSchema } from '../locationMaintenanceSchema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<FormSchema>;
    export let data;

    const location = data.data;
</script>

<Form.Root method="POST" {form} schema={formSchema} let:config class="w-full text-xs">
    <div class="flex flex-wrap">
        <Form.Field {config} name="location_name">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_name">Location Name*</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="location_name" type="text" value={location?.location_name}/>
                    <Form.Validation />
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="location_mode">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_mode">Location Mode*</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="location_mode" type="text" value={location?.location_mode}/>
                        <Form.Validation />
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="status">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="status">Status*</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="status" type="text" value={location?.status}/>
                        <Form.Validation />
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="location_alias">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="location_alias">Location Alias</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="location_alias" type="text" value={location?.location_alias}/>
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="description">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="description">Description</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="description" type="text" value={location?.description}/>
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="address">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="address">Address</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="address" type="text" value={location?.address}/>
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="position_longitude">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_longitude">Position Longitude</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="position_longitude" type="text" value={location?.position_longitude}/>
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="position_latitude">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_latitude">Position Latitude</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="position_latitude" type="text" value={location?.position_latitude}/>
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="position_altitude">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_altitude">Position Altitude</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
                        id="position_altitude" type="text" value={location?.position_altitude}/>
                </div>
            </Form.Item>
        </Form.Field>
        <Form.Field {config} name="defunct_ind">
            <Form.Item class="md:flex w-full md:items-center pb-2">
                <div class="md:w-1/3">
                    <Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="defunct_ind">Defunct Indicator</Form.Label>
                </div>
                <div class="pr-4 md:w-2/3">
                    <Form.Switch id="defunct_ind" checked={location?.defunct_ind}/>
                </div>
            </Form.Item>
        </Form.Field>
    </div>
    {#if Object.keys(data).length === 0}
        <div class="flex justify-center pt-4">
            <Form.Button class="w-full">Add</Form.Button>
        </div>
    {:else}
        <div class="flex justify-center pt-4">
            <Form.Button class="w-full">Update</Form.Button>
        </div>
    {/if}
</Form.Root>