<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Table from '$lib/components/ui/table';
	import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Actions from '$lib/components/ui/data-table/data-table-actions.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LocationMaintenanceForm from './[slug]/+page.svelte';
	import type { Location } from './locationMaintenanceSchema';

	export let pageData: PageData;
	const data: Location[] = pageData.locationList;
	
	let addUpdate: boolean;

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy({ disableMultiSort: false }),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns()
	});
	const columns = table.createColumns([
		table.column({
			header: '',
			accessor: ({ location_id }) => location_id,
			cell: (item, state) => {
				return createRender(Actions, {
					ids: [{ name: 'Location Id', value: item.value }],
					actionItems: [
						{
							name: 'Update',
							action: async () => {
								const href = `locationMaintenance/${item.value}`;
								const result = await preloadData(href);
								addUpdate = false;
								if (result.type === 'loaded' && result.status === 200) {
									pushState(href, { selected: result.data });
								} else {
									goto(href);
								}
							}
						}
					]
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'status',
			header: 'Status',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'location_name',
			header: 'Location Name',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'location_alias',
			header: 'Location Alias',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'description',
			header: 'Description',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'location_mode',
			header: 'Location Mode',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'address',
			header: 'Address',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'position_longitude',
			header: 'Position Longitude',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'position_latitude',
			header: 'Position Latitude',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'position_altitude',
			header: 'Position Altitude',
			plugins: {
				sort: { disable: false },
				filter: { exclude: false }
			}
		}),
		table.column({
			accessor: 'defunct_ind',
			header: 'Defunct Indicator',
			plugins: {
				sort: { disable: true },
				filter: { exclude: true }
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { sortKeys } = pluginStates.sort;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId).filter(([, hide]) => !hide).map(([id]) => id);
	const hidableCols = [
		'hospitalOrganization',
		'status',
		'location_mode',
		'location_name',
		'address',
		'location_alias',
		'managing_organization',
		'description',
		'position_longitude'
	];

	function query() {
		invalidate('/locationMaintenance');
	}
</script>

<div>
	<div class="flex w-full justify-end gap-2">
		<Button class="h-8 bg-blue-600 hover:bg-blue-800" on:click={query}>Query</Button>
		<a class="h-8 bg-green-600 px-4 hover:bg-green-800 inline-flex items-center text-white justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" href="locationMaintenance/0" on:click={
			async (e) => {
				if (e.metaKey || innerWidth < 640) return;
				e.preventDefault();

				const { href } = e.currentTarget;
				const result = await preloadData(href);
				addUpdate = true;
				if (result.type === 'loaded' && result.status === 200) {
					pushState(href, { selected: result.data });
				} else {
					goto(href);
				}
			}
		}>Add</a>
	</div>
	<div class="flex w-full justify-between py-4">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hidableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<div class="flex w-1/6 flex-row items-center">
			<Label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0">Search</Label>
			<Input
				class="bg-white-200 w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:outline-none disabled:bg-gray-200"
				type="text"
				bind:value={$filterValue}
			/>
		</div>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header class="bg-gray-200">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="font-bold text-black [&:has([role=checkbox])]:pl-3">
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											{#if typeof $sortKeys[0] !== 'undefined' && $sortKeys[0].order === 'asc' && $sortKeys[0].id === cell.id}
												<ArrowUp class={'ml-2 h-4 w-4'} />
											{:else if typeof $sortKeys[0] !== 'undefined' && $sortKeys[0].order === 'desc' && $sortKeys[0].id === cell.id}
												<ArrowDown class={'ml-2 h-4 w-4'} />
											{/if}
										</Button>
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row
							{...rowAttrs}
							class={row.isData() && row.original.defunct_ind ? 'bg-red-400 hover:bg-red-500' : ''}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<div class="text-center">
											<Render of={cell.render()} />
										</div>
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button variant="outline" size="sm" on:click={() => ($pageIndex = $pageIndex - 1)} disabled={!$hasPreviousPage}>Previous</Button>
		<Button variant="outline" size="sm" disabled={!$hasNextPage} on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button>
	</div>
</div>

<Sheet.Root open={$page.state.selected != null}>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>
				{#if addUpdate}
					Add 
				{:else}
					Update 
				{/if}
				Location
			</Sheet.Title>
			<Separator />
			<Sheet.Description class="pt-4">
				<LocationMaintenanceForm data={$page.state.selected} />
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>