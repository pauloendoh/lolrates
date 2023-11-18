export function getLolGraphsAramChampionUrl(
  summonerName: string,
  championName: string
) {
  // if championName  = Garen
  //and from Url https://www.leagueofgraphs.com/summoner/champions/br/douppelgengar#championsData-aram
  // becomes
  // https://www.leagueofgraphs.com/summoner/champions/garen/br/douppelgengar/aram

  const clearChampionName = championName
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();

  const newUrl = `https://www.leagueofgraphs.com/summoner/champions/${clearChampionName}/br/${summonerName}/aram`;
  return newUrl;
}
