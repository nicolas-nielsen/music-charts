import { lastfmRepository } from "@Application/src/repository/lastfm.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const user = searchParams.get('user')
  try {
    const response = await lastfmRepository.getUserTopArtists(user);

    return Response.json(response)
  } catch(e: Error) {
    const code = parseInt(e.message);

    return NextResponse.json({code, message: e.message}, {status: code});
  }
}