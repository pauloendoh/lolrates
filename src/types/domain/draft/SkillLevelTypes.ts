export const skillLevels = ["OP", "Encourage", "Backlog"] as const;

export type SkillLevelTypes = (typeof skillLevels)[number];
