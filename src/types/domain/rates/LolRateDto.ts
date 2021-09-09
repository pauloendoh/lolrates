import { LolRateChampionDto } from "./LolRateChampionDto";
import { LolRateUpdatedAt } from "./LolRateUpdatedAt";

export interface LolRateDto {
  rates: LolRateChampionDto[];
  updatedAt: LolRateUpdatedAt;
}
