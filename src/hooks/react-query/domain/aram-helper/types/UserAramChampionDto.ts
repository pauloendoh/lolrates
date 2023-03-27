export interface UserAramChampionDto {
  id: number;
  userId: number;
  championId: number;
  fun: number;
  runes: string;
  items: string;
  extraNotes: string;
  createdAt: string;
  updatedAt: string;
}

export const buildUserAramChampionDto = (
  p?: Partial<UserAramChampionDto>
): UserAramChampionDto => ({
  id: 0,
  userId: 0,
  championId: 0,
  fun: 0,
  runes: "",
  items: "",
  extraNotes: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
});
