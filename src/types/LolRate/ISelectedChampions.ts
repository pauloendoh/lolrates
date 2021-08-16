import { ILolRateChampion } from "./ILolRateChampion";

// PE 2/3 - ver como fazer para as chaves serem do tipo ChampionRoleType
export interface ISelectedChampions {
  TOP: ILolRateChampion;
  JUNGLE: ILolRateChampion;
  MID: ILolRateChampion;
  BOT: ILolRateChampion;
  SUP: ILolRateChampion;
}

export const getEmptySelectedChampions = (): ISelectedChampions => ({
  TOP: null,
  JUNGLE: null,
  MID: null,
  BOT: null,
  SUP: null,
});
