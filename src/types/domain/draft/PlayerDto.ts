import { PlayerChampionDto } from "./PlayerChampionDto";

export interface PlayerDto {
  id: number;
  userId?: number;
  name: string;

  champions?: PlayerChampionDto[],
  
  createdAt: string;
  updatedAt: string;
}

export const getEmptyPlayerDto = (): PlayerDto => ({
  id: null,
  name: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
