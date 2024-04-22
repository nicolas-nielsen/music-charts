import * as fs from 'fs';

export const imageService = {
  imageExists(file: string): boolean {
    return fs.existsSync(file);
  },
};
