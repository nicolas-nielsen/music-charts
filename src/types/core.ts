export interface HttpError {
  code: number;
  message: string;
}

export type ImageMime =
  | 'image/gif'
  | 'image/png'
  | 'image/jpeg'
  | 'image/bmp'
  | 'image/webp';
