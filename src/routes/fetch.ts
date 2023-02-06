export const fetchBlahaj = async (f: typeof fetch) => {
  const res = await f('https://www.reddit.com/r/blahaj/random.json');
  const data = await res.json();

  try {
    for (const post of data[0].data.children) {
      if (!(post.data.url_overridden_by_dest as string).includes('gallery') && post.data.post_hint === 'image') {
        return { url: post.data.url_overridden_by_dest };
      }
    }
    return { url: null };
  } catch (error) {
    return { url: null };
  }
}