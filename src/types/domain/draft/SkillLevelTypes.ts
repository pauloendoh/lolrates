export const skillLevels = [
  "OP",
  "Decent/Practice",
  "Training recommendation",
] as const;

export type SkillLevelTypes = (typeof skillLevels)[number];
