const tries = 3;

export const fetchBlahaj = async (f: typeof fetch) => {

  for (let index = 0; index < tries; index++) {
    try {
      const res = await f('https://www.reddit.com/r/blahaj/random.json');
      if (!res.ok) return { url: null };
      const data = await res.json();

      for (const post of data[0].data.children) {
        if (
          !(post.data.url_overridden_by_dest as string).includes('gallery')
          && post.data.post_hint === 'image'
        ) {
          return { url: post.data.url_overridden_by_dest || post.data.url };
        }
      }
    } catch (error) { }
  }
  return { url: null };
}