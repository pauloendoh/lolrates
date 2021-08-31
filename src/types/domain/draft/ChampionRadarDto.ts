export interface ChampionRadarDto {
  id: number;
  championId: number;
  dps: number;
  burst: number;
  tankiness: number;
  engage: number;
  protect: number;

  createdAt: string;
  updatedAt: string;
}

export const getChampionRadarDto = (championId: number): ChampionRadarDto => ({
  id: null,
  championId,
  dps: 1,
  burst: 1,
  tankiness: 1,
  engage: 1,
  protect: 1,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
