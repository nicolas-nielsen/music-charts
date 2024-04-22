export interface ParsedBioSummary {
  bio: string;
  href: string;
  linkText: string;
}

export const parseBioSummary = (bioSummary: string): ParsedBioSummary | string => {
  const parsingArray: string[] | null = /(.*)<a href="(.*)">(.*)<\/a>/.exec(bioSummary);

  const parsedBioSummary: ParsedBioSummary | null =
    parsingArray && parsingArray.length === 4
      ? {
          bio: parsingArray[1],
          href: parsingArray[2],
          linkText: parsingArray[3],
        }
      : null;

  return parsedBioSummary ?? bioSummary;
};
