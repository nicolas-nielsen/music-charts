import * as fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { constants } from 'http2';

const publicFolder = process.env.publicFolder;

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const { url, file } = body;

  try {
    const response: Response = await fetch(url);
    const buffer: Buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFile(path.join(publicFolder, file), buffer, (err) => {
      console.error(err?.message);
    });
  } catch (e: Error) {
    console.error(e);

    return NextResponse.json({}, { status: constants.HTTP_STATUS_BAD_REQUEST });
  }

  return NextResponse.json({}, { status: constants.HTTP_STATUS_ACCEPTED });
}
