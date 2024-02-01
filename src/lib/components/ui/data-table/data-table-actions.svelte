<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';
	import type { DataTableAction, idAction } from './actionSchema';

	export let ids: idAction[];
	export let actionItems: DataTableAction[];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			{#each ids as id}
				<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id.value.toString())}>
					Copy {id.name}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
		<DropdownMenu.Group>
			<DropdownMenu.Label>View</DropdownMenu.Label>
			{#each actionItems as actionItem}
				<DropdownMenu.Item on:click={actionItem.action}>
					{actionItem.name}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
