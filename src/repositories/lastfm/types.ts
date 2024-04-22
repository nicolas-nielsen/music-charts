export interface UserTopArtists {
  topartists: {
    artist: [UserArtist];
  };
}

export interface LastfmError {
  code: number;
  message: string;
}

export interface UserArtist {
  '@attr': {
    rank: string;
  };
  image: [];
  name: string;
  mbid: string;
  playcount: string;
  streamable: string;
  url: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
  image: [];
  streamable: string;
  ontour: string;
  stats: {
    listeners: string;
    playcount: string;
  };
  similar: {
    artist: [];
  };
  tags: {
    tag: [Tag];
  };
}

export interface Tag {
  name: string;
  url: string;
}

export enum ApiMethods {
  UserGetTopArtists = 'user.gettopartists',
  ArtistGetInfos = 'artist.getinfo',
}
