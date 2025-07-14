<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import '../app.css';

	let { children } = $props();
</script>
<Header />
<LoadingSpinner />
{@render children()}	