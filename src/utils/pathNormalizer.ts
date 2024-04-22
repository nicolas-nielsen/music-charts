import path from 'path';

const artistFolder = 'artist';

export const getArtistImagePath = (
  name: string,
  isRelative: boolean = false,
  extension: string = '.jpg',
) => {
  const artistFileName = name.toLowerCase().replace(/\s/g, '_');

  return path
    .join(
      isRelative ? '/' : '',
      process.env.imageFolder,
      artistFolder,
      artistFileName,
    )
    .concat(extension);
};
