export const getPatchHistoryUrl = (championName: string) => {
  return `https://leagueoflegends.fandom.com/wiki/${championName
    .split(" ")
    .join("_")}/LoL/Patch_history`;
};
