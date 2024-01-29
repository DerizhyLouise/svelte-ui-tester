<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { MoreHorizontal } from 'lucide-svelte';
	import LocationMaintenanceForm from './locationMaintenanceForm.svelte';
	import type { PageData } from './$types';

	export let location_id: number;
	// export let pageData: PageData;

	let triggerCloseOnItemClick: boolean = true;
	let triggerCloseOnOutsideClick: boolean = true;
</script>

<DropdownMenu.Root closeOnItemClick={triggerCloseOnItemClick} closeOnOutsideClick={triggerCloseOnOutsideClick}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
        <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(location_id.toString())}>
            Copy Location ID
        </DropdownMenu.Item>
        <DropdownMenu.Item href="locationMaintenance/{location_id}">
            Update
        </DropdownMenu.Item>
		<!-- <DropdownMenu.Item>
			<Sheet.Root closeOnOutsideClick={false}>
				<Sheet.Trigger>
					<Button variant="ghost" class="min-w-[8rem] h-auto p-0 flex justify-start" on:click={() => {triggerCloseOnItemClick = false, triggerCloseOnOutsideClick = false}}>Update</Button>
				</Sheet.Trigger>
				<Sheet.Content>
					<Sheet.Header>
						<Sheet.Title>Update Location</Sheet.Title>
						<Separator />
						<Sheet.Description class="pt-4">
							<LocationMaintenanceForm form={pageData.form} addUpdate={"UPDATE"}/>
						</Sheet.Description>
					</Sheet.Header>
				</Sheet.Content>
			</Sheet.Root>
		</DropdownMenu.Item> -->
	</DropdownMenu.Content>
</DropdownMenu.Root>