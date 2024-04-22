import { ImageMime } from '@Application/src/types/core';

export interface ImageSearchResult {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: [[Object]];
    nextPage: [[Object]];
  };
  context: { title: string };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items: [ImageItem];
}

export interface ImageItem {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: ImageMime;
  fileFormat: ImageMime;
  image: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}
