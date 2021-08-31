import { ChampionDto } from "../domain/general/ChampionDto"
import { ChampionRoleType } from "./ChampionRoleType"

export interface ILolRateChampion {
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

export const getLolRateDto = (champion: ChampionDto, role: ChampionRoleType): ILolRateChampion => ({
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