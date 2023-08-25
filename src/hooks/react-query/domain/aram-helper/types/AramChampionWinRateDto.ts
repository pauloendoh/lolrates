export type AramChampionWinRateDto = {
  championName: string;
  aramWin: number;
  iconUrl: string;

  myWinRate: number | null;
  myPlayedCount: number | null;
};
