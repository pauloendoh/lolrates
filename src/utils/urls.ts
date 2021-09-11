export const urls = {
  opgg: "https://www.op.gg/champion/statistics",
  lolgraph: "https://www.leagueofgraphs.com/champions/builds",
  ugg: "https://u.gg/lol/champions/",
  uggChampion: (championName: string) => `https://u.gg/lol/champions/${championName}/build`, 
  api: {
    player: "/lolrates/player",
    playerChampion: "/lolrates/playerChampion",
    playerChampionId: (id: number) => `/lolrates/playerChampion/${id}`,
    champion: "/lolrates/champion",
    championRadar: "/lolrates/championRadar",
  },
  pages: {
    index: "/", 
    draft: "/draft"
  }, 
  image: (fileName: string) => `/images/${fileName}`,
};