import { ChampionDto } from "../draft/ChampionDto"
import { ChampionRoleType } from "./ChampionRoleType"

export interface LolRateChampionDto {
  avgAvg: number
  championName: string
  role: string
  iconUrl: string
  opggPick: number
  opggWin: number
  lolgraphsPick: number
  lolgraphsWin: number
  uggPick: number
  uggWin: number
  avgPick: number
  avgWin: number
}

export const getLolRateChampionDto = (champion: ChampionDto, role: ChampionRoleType): LolRateChampionDto => ({
  avgAvg: null, 
  championName: champion.name,  
  role,
  iconUrl: champion.iconUrl,  
  opggPick: null, 
  opggWin: null, 
  lolgraphsPick: null, 
  lolgraphsWin: null, 
  uggPick: null, 
  uggWin: null, 
  avgPick: null, 
  avgWin: null, 
})