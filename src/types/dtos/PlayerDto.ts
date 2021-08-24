export interface PlayerDto {
  id: number;
  userId?: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const getEmptyPlayerDto = (): PlayerDto => ({
  id: null,
  name: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
