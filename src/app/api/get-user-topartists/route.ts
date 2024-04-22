import { lastfmRepository } from '@Application/src/repositories/lastfm/lastfm.repository';
import { NextRequest, NextResponse } from 'next/server';
import { UserTopArtists } from '@Application/src/repositories/lastfm/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams: URLSearchParams = request.nextUrl.searchParams;
  const user: string | null = searchParams.get('user');
  try {
    const topArtists: UserTopArtists = await lastfmRepository.getUserTopArtists(user);

    return NextResponse.json(topArtists);
  } catch (e: Error) {
    const code: number = parseInt(e.message);

    return NextResponse.json({ code, message: e.message }, { status: code });
  }
}
