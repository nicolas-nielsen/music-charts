const apiKey = process.env.LASTFM_API_KEY
const format = 'json';

export interface UserTopArtists {
  topartists: {
    artist: [
      {
        '@attr': {
          rank: string,
        },
        image: [],
        name: string,
        mbid: string,
        playcount: string,
        streamable: string,
        url: string,
      },
    ],
  },
}

export interface LastfmError {
  code: number,
  message: string,
}

export const lastfmRepository = {
  async getUserTopArtists(user: string): Promise<UserTopArtists> {
    const response: Response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${user}&api_key=${apiKey}&format=${format}`);
    if (response.ok) {
      return await response.json();
    } else {
      const bodyError: LastfmError = await response.json();

      console.log('error ' + response.status);

      throw new Error(`${response.status} error occurred, message: ${bodyError.message}`);
    }
  },

  async getArtistDetail(name: string): Promise<Response> {
    return await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${apiKey}&format=${format}`);
  }
}