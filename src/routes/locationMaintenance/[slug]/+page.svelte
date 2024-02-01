<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from '../locationMaintenanceSchema';
	import type { PageData } from './$types';
	import { type FormOptions } from "formsnap";
	import { invalidate, invalidateAll } from '$app/navigation';

	export let data: PageData;
	let form : SuperValidated<FormSchema> = data.form;
	
	const options: FormOptions<typeof formSchema> = {
		validators: formSchema,
		onResult: (result) => {
			if (result.result.type === 'success') {
				history.back();
				invalidate('/locationMaintenance');
			}
		},
	};
</script>

<Form.Root {options} form={form} schema={formSchema} let:config let:enhance class="w-full text-xs">
	<form method="POST" action={'?/submit'} use:enhance>
		<div class="flex flex-wrap">
			<Form.Field {config} name="location_id">
				<Form.Item>
					<Form.Input id="location_id" type="hidden" value={form.data?.location_id}></Form.Input>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_name">
				<Form.Item class="md:flex w-full md:items-center pb-2">
					<div class="md:w-1/3">
						<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_name">Location Name*</Form.Label>
					</div>
					<div class="pr-4 md:w-2/3">
						<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
							id="location_name" type="text" value={form.data?.location_name}/>
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
							id="location_mode" type="text" value={form.data?.location_mode}/>
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
							id="status" type="text" value={form.data?.status}/>
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
							id="location_alias" type="text" value={form.data?.location_alias}/>
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
							id="description" type="text" value={form.data?.description}/>
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
							id="address" type="text" value={form.data?.address}/>
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
							id="position_longitude" type="text" value={form.data?.position_longitude}/>
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
							id="position_latitude" type="text" value={form.data?.position_latitude}/>
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
							id="position_altitude" type="text" value={form.data?.position_altitude}/>
					</div>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="defunct_ind">
				<Form.Item class="md:flex w-full md:items-center pb-2">
					<div class="md:w-1/3">
						<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="defunct_ind">Defunct Indicator</Form.Label>
					</div>
					<div class="pr-4 md:w-2/3">
						<Form.Switch id="defunct_ind" checked={form.data?.defunct_ind}/>
					</div>
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