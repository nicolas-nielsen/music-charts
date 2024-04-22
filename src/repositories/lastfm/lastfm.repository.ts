import {
  LastfmError,
  UserTopArtists,
  ApiMethods,
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

  async getArtistDetail(mbid: string): Promise<Response> {
    const searchParams: URLSearchParams = this._getSearchParams({
      method: ApiMethods.ArtistGetInfos,
      mbid,
    });
    const response: Response = await fetch(
      `${endpoint}?${searchParams.toString()}`,
    );
    const body = await response.json();
    if (body.error) {
      const bodyError: LastfmError = body;

      throw this._formatError(response, bodyError);
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
