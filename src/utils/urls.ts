import RationItemType from "@/types/domain/ration/RationItemType";
import buildUrl from "build-url-ts";

export const urls = {
  pages: {
    index: "/",
    indexSearch: (q: string) => `?q=${q}`,
    draft: "/draft",
    playground: "/playground",
    rationSearch: (q?: string, type?: RationItemType) =>
      buildUrl({
        path: "/ration",
        queryParams: { q, type },
      }),

    aramHelper: "/aram-helper",
  },

  opgg: "https://www.op.gg/champion/statistics",
  lolgraph: "https://www.leagueofgraphs.com/champions/builds",
  ugg: "https://u.gg/lol/champions/",
  uggChampion: (championName: string) =>
    `https://u.gg/lol/champions/${championName}/build`,
  api: {
    player: "/lolrates/player",
    playerChampion: "/lolrates/playerChampion",
    playerChampionId: (id: number) => `/lolrates/playerChampion/${id}`,
    champion: "/lolrates/champion",
    championRadar: "/lolrates/championRadar",

    playground: {
      fullTextSeachResources: (query: string) =>
        `/playground/full-text-search/resources?query=${query}`,
      stripeCheckout: "/create-checkout-session",
    },
    publicTags: "/playground/all-public-tags",
    aramChampionWinRates: "/aram-champions-win-rates",
    myAramChampions: "/my-aram-champions",
  },

  image: (fileName: string) => `/images/${fileName}`,
};
