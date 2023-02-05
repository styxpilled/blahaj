<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		const oldUrl = localStorage.getItem('blahaj_url');
		data.url = data.url ?? (oldUrl || '');
		if (data.url) localStorage.setItem('blahaj_url', data.url);
		else localStorage.setItem('blahaj_url', data.url);
	});
</script>

<main>
	<h1>
		A random Blahaj pulled from <a href="reddit.com/r/BLAHAJ">r/BLAHAJ</a>
	</h1>
	<img src={data.url} alt="Random Blahaj image" />
</main>

<style>
	main {
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		max-width: 90vw;
		max-height: 85vh;
	}
</style>
