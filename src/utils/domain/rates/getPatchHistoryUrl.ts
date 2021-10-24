// PE 2/3 - should be in urls?
export const getChampionHistoryUrl = (championName: string) => {
  return `https://leagueoflegends.fandom.com/wiki/${championName
    .split(" ")
    .join("_")}/LoL/Patch_history`;
};
