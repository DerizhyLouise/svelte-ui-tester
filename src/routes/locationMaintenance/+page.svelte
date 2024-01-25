<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion';
    import type { PageData } from "./$types";
	import LocationMaintenanceTable from "./locationMaintenanceTable.svelte";

	export let data: PageData;
</script>

<body>
	<header class="flex h-24 w-screen justify-center bg-yellow-200"></header>
	<div class="mt-2 flex justify-center">
		<Tabs.Root value="tab1" class="m-8 h-full w-[100vw] rounded-md border-2">
			<Tabs.List class="grid w-full grid-cols-3">
				<Tabs.Trigger value="tab1">Location Maintenance</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="tab1">
				<Accordion.Root class="w-full sm:max-w-[100%]" multiple value={['locList']}>
					<Accordion.Item value="locList">
						<Accordion.Trigger class="text-lg font-bold hover:no-underline">Location list</Accordion.Trigger>
						<Accordion.Content>
							<Card.Root>
								<Card.Content class="space-y-2 pt-4 text-xs">
									<LocationMaintenanceTable pageData={data}/>
								</Card.Content>
							</Card.Root>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</body>