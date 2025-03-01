export const localStorageKeys = {
  onlyHighWinRate: "onlyHighWinRate",

  editorContent: "editorContent",

  summonerName: "summonerName",
  maxHoursAllowed: "maxHoursAllowed",
  maxMinutesAllowed: "maxMinutesAllowed",
  extraHours: "extraHours",
  extraMinutes: "extraMinutes",
  startingWeekday: "startingWeekday",

  draftRoleState: (role: string) => `draftRoleState-${role}`,

  summonerAramChampions: (summonerName: string) =>
    `summonerAramChampions-${summonerName}`,
} as const;
