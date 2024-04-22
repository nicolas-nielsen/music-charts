'use client';

import { useEffect, useState } from 'react';
import {
  UserArtist,
  UserTopArtists,
} from '@Application/src/repositories/lastfm/types';
import { HttpError } from '@Application/src/types/core';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Loading from '@Application/src/components/loading';
import ArtistCard from '@Application/src/components/artist.card';

export default function Page() {
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const userQueryParam = searchParams.get('user');
  if (userQueryParam && user !== userQueryParam) {
    setUser(() => userQueryParam);
  }

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response: Response = await fetch(
        `/api/get-user-topartists?user=${user}`,
      );
      if (response.ok) {
        const userTopArtists: UserTopArtists = await response.json();
        const artists: UserArtist[] = userTopArtists.topartists.artist;

        setArtists(() => artists);
        setIsLoading(() => false);
      } else {
        const error: HttpError = await response.json();
        console.error(error.message);

        setIsLoading(false);

        setArtists(() => []);
      }
    }

    if (user !== '') {
      getData();
    } else {
      setArtists(() => []);
    }
  }, [user]);

  const handleChange = ({ target }) => {
    setUser(() => target.value);
    router.replace(`/user-charts?user=${target.value}`, undefined, {
      shallow: true,
    });
  };

  const handleResetUser = () => {
    router.replace('/user-charts', undefined, { shallow: true });
    setUser(() => '');
  };

  let artistElement: JSX.Element;
  if (isLoading) {
    artistElement = <Loading />;
  } else if (artists.length === 0) {
    artistElement = <p>No results</p>;
  } else {
    artistElement = (
      <div className="grid grid-cols-3 gap-3">
        {artists.map((artist: UserArtist) => {
          return <ArtistCard artist={artist} user={user} key={artist.name} />;
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 gap-x-6 gap-y-8">
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                value={user}
                onChange={handleChange}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="username"
              />
              <span
                className="flex pl-3 text-gray-500 sm:text-sm"
                onClick={handleResetUser}
              >
                x
              </span>
            </div>
          </div>
        </div>
      </div>
      {artistElement}
    </div>
  );
}
