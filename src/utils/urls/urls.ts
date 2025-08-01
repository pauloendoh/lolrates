import RationItemType from "@/types/domain/ration/RationItemType";
import buildUrl from "build-url-ts";
import { getChampionHistoryUrl } from "../domain/rates/getPatchHistoryUrl";
import { getLolGraphsAramChampionUrl } from "./getLolGraphsAramChampionUrl/getLolGraphsAramChampionUrl";

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
    mal: "/mal",
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
    aramChampionWinRates: (summonerName: string) =>
      "/aram-champions-win-rates?lolgraphsUrl=" +
      encodeURIComponent(
        `https://www.leagueofgraphs.com/summoner/champions/br/${summonerName}-BR1#championsData-aram`
      ),
    myAramChampions: "/my-aram-champions",

    malUser: "/mal-user",
    malSimilarity: "/mal-similarities",
    toggleMalCheck: (id: number) => `/mal-similarities/${id}/check`,
    playtime: (
      offsetHours: number,
      summonerName: string,
      startingWeekday: number
    ) =>
      `/playtime?offsetHours=${offsetHours}&summonerName=${summonerName}&startingWeekday=${startingWeekday}`,
  },

  image: (fileName: string) => `/images/${fileName}`,

  others: {
    opggAramChampion: (championName: string) => {
      const clearName = championName
        .replace(/[^a-zA-Z ]/g, "")
        .replace(/\s/g, "");
      return `https://www.op.gg/modes/aram/${clearName}/build`;
    },
    patchNotes: (championName: string) => getChampionHistoryUrl(championName),
    lolGraphsAramChampion: (fromUrl: string, championName: string) =>
      getLolGraphsAramChampionUrl(fromUrl, championName),
  },
};
