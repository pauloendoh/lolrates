export const getLolGraphsUrl = (championName: string) => {
  return `https://www.leagueofgraphs.com/champions/builds/${championName
    .replace(" ", "")
    .replace("'", "")
    .toLowerCase()}`;
};
