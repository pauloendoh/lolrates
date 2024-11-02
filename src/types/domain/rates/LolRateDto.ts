import { LolRateChampionDto } from "./LolRateChampionDto";
import { LolRateUpdatedAt } from "./LolRateUpdatedAt";

// PE 1/3 - rename to LolRatesWithUpdatedAtDto
export interface LolRateDto {
  rates: LolRateChampionDto[];
  updatedAt: LolRateUpdatedAt;
}
