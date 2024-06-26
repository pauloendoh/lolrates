export const localStorageKeys = {
  editorContent: "editorContent",

  summonerName: "summonerName",
  maxHoursAllowed: "maxHoursAllowed",
  maxMinutesAllowed: "maxMinutesAllowed",
  extraHours: "extraHours",
  extraMinutes: "extraMinutes",
  startingWeekday: "startingWeekday",

  draftRoleState: (role: string) => `draftRoleState-${role}`,
};
