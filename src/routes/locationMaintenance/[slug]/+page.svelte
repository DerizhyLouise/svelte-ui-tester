<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Form from './locationMaintenanceForm.svelte';

	export let data: PageData;

	const isOnNativePage = $page.params.id !== undefined;
</script>

<div class={`${isOnNativePage ? 'container' : ''}`}>
	{#if isOnNativePage}
		{@const pageTitle = $page.params.id === 'add' ? 'Add' : 'Edit'}
		<div class="flex flex-col space-y-2 text-center sm:text-left">
			<h3 class="text-lg font-semibold text-foreground">{pageTitle} Payment</h3>
			<p class="text-sm text-muted-foreground">Make changes to your payment here.</p>
		</div>
	{/if}
	<Form form={data.form} {isOnNativePage}
		class={`${isOnNativePage ? 'mx-auto py-10' : ''}`}
	/>
</div>