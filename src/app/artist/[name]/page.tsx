import { lastfmRepository} from "@Application/src/repository/lastfm.repository";
import { parseBioSummary, ParsedBioSummary } from "@Application/src/utils/parseBioSummary";

export default async function Page({params}) {
  const artistDetails = await (await lastfmRepository.getArtistDetail(params.name)).json();
  // const images = await (await fetch('https://serpapi.com/search.json?engine=google_images&q=cunninlynguists&api_key=30e8d1f93b78fd09ff02609b29dc0bac89e8fc0eef25335cc6c7f0259eba2043')).json();
  // const images = await (await fetch(`https://customsearch.googleapis.com/customsearch/v1?searchType=image&cx=f5b69b74ac60e4b58&q=${params.name} music&key=AIzaSyAHkxULg3hiW6mujM-KbpFhqYl4DadONGA`)).json();
  const parsedBioSummary: ParsedBioSummary | string = parseBioSummary(artistDetails.artist.bio.summary);
  let bioElement: JSX.Element;
  if (typeof parsedBioSummary === 'string') {
    bioElement = <p>{parsedBioSummary}</p>
  } else {
    bioElement = <p>{parsedBioSummary.bio} <a href={parsedBioSummary.href}>{parsedBioSummary.linkText}</a></p>
  }

 return (
   <div>
     <p>{artistDetails.artist.name}</p>
     { bioElement }
     {/*<img src={images.items[0].link}  />*/}
   </div>
 );
}