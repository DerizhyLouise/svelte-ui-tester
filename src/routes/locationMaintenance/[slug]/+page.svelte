<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from '../locationMaintenanceSchema';
	import type { PageData } from './$types';
	import { type FormOptions } from "formsnap";
	import { invalidate, invalidateAll, goto } from '$app/navigation';

	export let data: PageData;
	let form : SuperValidated<FormSchema> = data.form;
	
	const options: FormOptions<typeof formSchema> = {
		validators: formSchema,
		onResult: (result) => {
			if (result.result.type === 'success') {
				return goto('http://localhost:5173/locationMaintenance');
			}
		},
	};
</script>

<Form.Root {options} form={form} schema={formSchema} let:config let:enhance asChild class="w-full text-xs">
	<form method="POST" action="?/submit" use:enhance autocomplete="off">
		<div class="flex flex-wrap">
			<Form.Field {config} name="location_id">
				<Form.Item>
					<Form.Input id="location_id" type="hidden" value={form.data.location_id}></Form.Input>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_name">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_name">Location Name*</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="location_name" type="text" value={form.data?.location_name}/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_mode">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_mode">Location Mode*</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="location_mode" type="text" value={form.data?.location_mode}/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="status">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="status">Status*</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="status" type="text" value={form.data?.status}/>
						<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_alias">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="location_alias">Location Alias</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="location_alias" type="text" value={form.data?.location_alias}/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="description">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="description">Description</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="description" type="text" value={form.data?.description}/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="address">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="address">Address</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="address" type="text" value={form.data?.address}/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="position_longitude">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_longitude">Position Longitude</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="position_longitude" type="text" value={form.data?.position_longitude}/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="position_latitude">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_latitude">Position Latitude</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="position_latitude" type="text" value={form.data?.position_latitude}/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="position_altitude">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_altitude">Position Altitude</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="position_altitude" type="text" value={form.data?.position_altitude}/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="defunct_ind">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="defunct_ind">Defunct Indicator</Form.Label>
					<Form.Switch id="defunct_ind" checked={form.data?.defunct_ind}/>
				</Form.Item>
			</Form.Field>
		</div>
		<div class="flex justify-center pt-4">
			<Form.Button type="submit" class="w-full">
				{#if form.data.location_id == 0}
					Add
				{:else}
					Update
				{/if}
			</Form.Button>
		</div>
	</form>
</Form.Root>