import type { PageLoad } from './$types';
import { fetchBlahaj } from './fetch';

export const load: PageLoad = async ({ fetch }) => {
  return (await fetchBlahaj(fetch));
};