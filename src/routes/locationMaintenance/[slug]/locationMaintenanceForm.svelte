<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { locationSchema } from '../locationMaintenanceSchema';
	import { type FormOptions } from "formsnap";
	import type { ClassValue } from 'tailwind-variants';
	import { cn } from '$lib/utils';
	import { tick } from "svelte";
	import { goto, pushState } from '$app/navigation';
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import * as Command from "$lib/components/ui/command";
	import { Check, ChevronsUpDown } from "lucide-svelte";

	type LocationSchema = typeof locationSchema;
	export let isOnNativePage: boolean;
	export let form : SuperValidated<LocationSchema>;
	
	const options: FormOptions<LocationSchema> = {
		id: form.id,
		taintedMessage: 'Are you sure you want leave?',
		scrollToError: 'smooth',
		clearOnSubmit: 'errors-and-message',
		multipleSubmits: 'prevent',
		validators: locationSchema,
		onResult: (result) => {
			if (result.result.type === 'success') {
				if (!isOnNativePage) {
					return pushState('http://localhost:5173/locationMaintenance', {});
				} else {
					return goto('http://localhost:5173/locationMaintenance');
				}
			}
		},
	};

	const statusCombobox = [
		{
			value: "active",
			label: "Active"
		},
		{
			value: "unactive",
			label: "Unactive"
		}
	];

	let open = false;
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
  	}

	let className: ClassValue = undefined;
	export { className as class };
</script>

<Form.Root {options} form={form} schema={locationSchema} let:config let:enhance asChild class="w-full text-xs">
	<form method="POST" action="?/submit" use:enhance autocomplete="off" class={cn('grid grid-flow-row', className)}>
		<div class="flex flex-wrap">
			<Form.Field {config} name="location_id">
				<Form.Item>
					<Form.Input id="location_id" type="hidden"/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_name">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_name">Location Name*</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="location_name" type="text"/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_mode">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="location_mode">Location Mode*</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="location_mode" type="text"/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="status" let:setValue let:value>
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-red-500 md:mb-0" for="status">Status*</Form.Label>
					<Popover.Root bind:open let:ids>
						<Popover.Trigger asChild let:builder>
							<Form.Control id={ids.trigger} let:attrs>
								<Button builders={[builder]} {...attrs} variant="outline" role="combobox" type="button" class={cn('w-full justify-between', !value && 'text-muted-foreground')}>
									{statusCombobox.find((f) => f.value === value)?.label ?? 'Select status'}
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</Form.Control>
						</Popover.Trigger>
						<Popover.Content class="p-0" sameWidth>	
							<Command.Root>
								<Command.Input autofocus placeholder="Search status..." />
								<Command.Empty>No status found.</Command.Empty>
								<Command.Group>
									{#each statusCombobox as status}
										<Command.Item value={status.value}
											onSelect={() => {
												setValue(status.value);
												closeAndFocusTrigger(ids.trigger);
											}}>
											<Check class={cn('mr-2 h-4 w-4', status.value !== value && 'text-transparent')} />
											{status.label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>					
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="location_alias">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="location_alias">Location Alias</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="location_alias" type="text"/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="description">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="description">Description</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="description" type="text"/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="address">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="address">Address</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="address" type="text"/>
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="position_longitude">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_longitude">Position Longitude</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="position_longitude" type="text"/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="position_latitude">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_latitude">Position Latitude</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="position_latitude" type="text"/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="position_altitude">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="position_altitude">Position Altitude</Form.Label>
					<Form.Input class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
						id="position_altitude" type="text"/>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Field {config} name="defunct_ind">
				<Form.Item class="w-full md:items-center pb-2">
					<Form.Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0" for="defunct_ind">Defunct Indicator</Form.Label>
					<Form.Switch id="defunct_ind"/>
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