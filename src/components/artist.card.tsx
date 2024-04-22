import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getArtistImagePath } from '@Application/src/utils/pathNormalizer';

export default function ArtistCard({ artist, user }) {
  const [src, setSrc] = useState(getArtistImagePath(artist.name, true));

  return (
    <Link
      href={{ pathname: `/artist/${artist.mbid}`, query: { user } }}
      key={artist.name}
    >
      <div className="p-2 border border-black m-3">
        <p className="text-lg p-2">name: {artist.name}</p>
        <p className="p-3">playcount: {artist.playcount}</p>
        <Image
          src={src}
          alt={artist.name}
          width={200}
          height={200}
          onError={() => setSrc(`/${process.env.imageFolder}/placeholder.png`)}
        />
      </div>
    </Link>
  );
}
