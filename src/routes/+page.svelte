<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fetchBlahaj } from './fetch';
	import Reload from './Reload.svelte';
	export let data: PageData;
	let show = false;
	let url: string;
	let img: HTMLImageElement;
	let animationPlaying = false;

	onMount(async () => setUrl(data.url || (await fetchBlahaj(fetch)).url));

	const setUrl = (newUrl: string) => {
		const oldUrl = localStorage.getItem('blahaj_url');
		url = newUrl ?? (oldUrl || '');
		if (url) localStorage.setItem('blahaj_url', url);
		else localStorage.setItem('blahaj_url', url);
		img.onload = () => (show = true);
		img.src = url;
	};

	const reload = async () => {
		if (!animationPlaying) {
			animationPlaying = true;
			setTimeout(() => {
				animationPlaying = false;
			}, 1000);
			setUrl((await fetchBlahaj(fetch)).url);
		}
	};
</script>

<main>
	<div>
		<button class:playing={animationPlaying} on:click={reload}><Reload /></button>
		<h1>
			A random Blahaj pulled from <a href="reddit.com/r/BLAHAJ">r/BLAHAJ</a>
		</h1>
	</div>
	{#if !show}
		loading...
	{/if}
	<img bind:this={img} class:hidden={!show} alt="Random Blahaj image" />
</main>

<style>
	main {
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	button {
		all: unset;
		display: flex;
		align-items: center;
		font-size: 2em;
		cursor: pointer;
	}

	button.playing {
		color: #3391ff;
		animation: spin 1s normal;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	div {
		display: flex;
	}

	div > * {
		padding: 0 0.5rem;
	}

	:global(html) {
		height: 100vh;
		width: 100vw;
	}

	@media (prefers-color-scheme: dark) {
		:global(html) {
			color: aliceblue;
			background-color: #181a1b;
		}
	}

	@media (prefers-color-scheme: light) {
		:global(html) {
			color: black;
			background-color: aliceblue;
		}
	}

	img {
		max-width: 90vw;
		max-height: 85vh;
	}

	.hidden {
		opacity: 0;
	}
</style>
