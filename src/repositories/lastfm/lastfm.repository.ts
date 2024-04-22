import {
  LastfmError,
  UserTopArtists,
  ApiMethods,
  Artist,
} from '@Application/src/repositories/lastfm/types';

const format = 'json';
const endpoint = process.env.LASTFM_ENDPOINT;
const apiKey = process.env.LASTFM_API_KEY;

export const lastfmRepository = {
  async getUserTopArtists(user: string): Promise<UserTopArtists> {
    const searchParams: URLSearchParams = this._getSearchParams({
      method: ApiMethods.UserGetTopArtists,
      user,
    });
    const response: Response = await fetch(
      `${endpoint}?${searchParams.toString()}`,
    );
    if (response.ok) {
      return response.json();
    } else {
      const bodyError: LastfmError = await response.json();

      throw this._formatError(response, bodyError);
    }
  },

  async getArtistDetail(mbid: string): Promise<Artist> {
    const searchParams: URLSearchParams = this._getSearchParams({
      method: ApiMethods.ArtistGetInfos,
      mbid,
    });
    const response: Response = await fetch(
      `${endpoint}?${searchParams.toString()}`,
    );
    const body: { artist: Artist } | LastfmError = await response.json();
    if ('message' in body) {
      throw this._formatError(response, body);
    } else {
      return body.artist;
    }
  },

  _getSearchParams(params: object): URLSearchParams {
    return new URLSearchParams({
      api_key: apiKey,
      format: format,
      ...params,
    });
  },

  _formatError(response: Response, bodyError: LastfmError): Error {
    return new Error(
      `${response.status} error occurred, message: ${bodyError.message}`,
    );
  },
};
