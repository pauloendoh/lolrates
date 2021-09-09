import { ChampionRoleType } from "../rates/ChampionRoleType";
import { ChampionDto } from "./ChampionDto";
import { SkillLevelTypes } from "./SkillLevelTypes";

export interface PlayerChampionDto {
  id: number;
  userId?: number;
  playerId: number;

  champion?: ChampionDto;
  championId?: number;

  role: ChampionRoleType;
  skillLevel: SkillLevelTypes;

  createdAt: string;
  updatedAt: string;
}

export const getEmptyPlayerChampionDto = (
  playerId: number,
  championId: number,
  skillLevel: SkillLevelTypes,
  role: ChampionRoleType
): PlayerChampionDto => ({
  id: null,
  playerId,
  role,
  championId,
  skillLevel,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const getFilledPlayerChampionDto = (
  id: number,
  playerId: number,
  championId: number,
  skillLevel: SkillLevelTypes,
  role: ChampionRoleType
): PlayerChampionDto => ({
  id,
  playerId,
  role,
  championId,
  skillLevel,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
