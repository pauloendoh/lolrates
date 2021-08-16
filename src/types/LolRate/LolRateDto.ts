import { ILolRateChampion } from "./ILolRateChampion";
import { ILolRateUpdatedAt } from "./ILolRateUpdatedAt";

export interface LolRateDto {
  rates: ILolRateChampion[];
  updatedAt: ILolRateUpdatedAt;
}
