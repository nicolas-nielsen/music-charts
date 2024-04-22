import { ImageSearchResult } from '@Application/src/repositories/google/types';

const apiKey = process.env.GOOGLE_API_KEY;
const endpoint = process.env.GOOGLE_ENDPOINT;
const cx = process.env.GOOGLE_SEARCH_ENGINE;
const searchType = 'image';

export const googleImageRepository = {
  async getImagesForKeyword(keyword: string): ImageSearchResult {
    const searchParams: URLSearchParams = new URLSearchParams({
      key: apiKey,
      cx,
      searchType,
      q: `${keyword}`,
      imgSize: 'large',
    });

    return await (await fetch(`${endpoint}?${searchParams.toString()}`)).json();
  },
};
