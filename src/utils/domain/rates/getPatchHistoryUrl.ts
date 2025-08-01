export const getChampionHistoryUrl = (championName: string) => {
  return `https://wiki.leagueoflegends.com/en-us/${championName
    .split(" ")
    .join("_")}/Patch_history`;
};
