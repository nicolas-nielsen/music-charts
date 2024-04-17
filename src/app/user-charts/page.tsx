'use client'

import {useEffect, useState} from "react";
import { lastfmRepository, UserTopArtists } from "@Application/src/repository/lastfm.repository";
import Link from "next/link";

export default function Page() {
  const [artists, setArtists] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response: Response = await fetch(`/api/getusertopartists?user=${user}`);
        const artists = (await response.json()).topartists.artist;

        setArtists(() => artists);
      } catch(e) {
        setArtists(() => []);
      }
    }

    if (user !== '') {
      getData();
    } else {
      setArtists(() => [])
    }
  }, [user]);

  const handleChange = ({ target }) => {
    setUser(() => target.value);
  }

  let render: JSX.Element;
  if (artists.length === 0) {
    render = <p>No results</p>
  } else {
    render = (
      <div className="grid grid-cols-3 gap-3">
        {
          artists.map((artist: any, i) => {
            return (
              <Link
                href="/artist/[name]"
                as={`artist/${artist.name}`}
                key={artist.name}
              >
                <div className="p-2 border border-black m-3">
                  <p className="text-lg p-2">name: {artist.name}</p>
                  <p className="p-3">playcount: {artist.playcount}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
    )

  }

  return (
    <div>
      <div className="mt-10 gap-x-6 gap-y-8">
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <div
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
              <input type="text"
                     name="username"
                     id="username"
                     autoComplete="username"
                     value={user}
                     onChange={handleChange}
                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                     placeholder="username" />
            </div>
          </div>
        </div>
      </div>
      {/*<form action="">*/}
      {/*  <input type="text" value={user} onChange={handleChange}/>*/}
      {/*</form>*/}
      { render }
    </div>
  );
}