import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('https://www.reddit.com/r/blahaj/random.json');
  const data = await res.json();

  try {
    const url: string = data[0].data.children[0].data.url_overridden_by_dest;
    return { url };
  } catch (error) {
    return { url: null };
  }
};