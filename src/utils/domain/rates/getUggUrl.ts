export const getUggUrl = (championName: string) => {
  return `https://leagueoflegends.fandom.com/wiki/${championName
    .split(" ")
    .join("_")}/LoL/Patch_history`;
};
