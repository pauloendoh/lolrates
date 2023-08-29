export function getLolGraphsAramChampionUrl(
  fromUrl: string,
  championName: string
) {
  // if championName  = Garen
  //and from Url https://www.leagueofgraphs.com/summoner/champions/br/douppelgengar#championsData-aram
  // becomes
  // https://www.leagueofgraphs.com/summoner/champions/garen/br/douppelgengar/aram

  const clearName = championName
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
  const url = new URL(fromUrl);
  const path = url.pathname;
  const pathParts = path.split("/");
  const server = pathParts[3];
  const summonerName = pathParts[4];
  const newUrl = `https://www.leagueofgraphs.com/summoner/champions/${clearName}/${server}/${summonerName}/aram`;
  return newUrl;
}
