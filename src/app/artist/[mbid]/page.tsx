import { lastfmRepository } from '@Application/src/repositories/lastfm/lastfm.repository';
import {
  parseBioSummary,
  ParsedBioSummary,
} from '@Application/src/utils/parseBioSummary';
import { googleImageRepository } from '@Application/src/repositories/google/google.image.repository';
import { imageService } from '@Application/src/services/image.service';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { getArtistImagePath } from '@Application/src/utils/pathNormalizer';

export default async function Page({ params, searchParams }) {
  let artist;
  try {
    artist = await lastfmRepository.getArtistDetail(params.mbid);
  } catch (e) {
    console.error(e);
    return <p>Artist Not found</p>;
  }

  const fileName = getArtistImagePath(artist.name);

  if (
    !imageService.imageExists(path.join(process.env.publicFolder, fileName))
  ) {
    const images = await googleImageRepository.getImagesForKeyword(
      `${artist.name} musical artist`,
    );
    await fetch(`${process.env.API_URL}/api/save-image`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.items[0].link,
        file: fileName,
      }),
    });
  }

  const imageSrc = getArtistImagePath(artist.name, true);

  const parsedBioSummary: ParsedBioSummary | string = parseBioSummary(
    artist.bio.summary,
  );
  let bioElement: JSX.Element;
  if (typeof parsedBioSummary === 'string') {
    bioElement = <p>{parsedBioSummary}</p>;
  } else {
    bioElement = (
      <p>
        {parsedBioSummary.bio}{' '}
        <a href={parsedBioSummary.href}>{parsedBioSummary.linkText}</a>
      </p>
    );
  }

  return (
    <>
      <Link
        href={{ pathname: '/user-charts', query: { user: searchParams.user } }}
      >
        Go back
      </Link>
      <p>{artist.name}</p>
      {bioElement}
      <Image src={imageSrc} alt={artist.name} width={200} height={200} />
    </>
  );
}
