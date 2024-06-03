import theme from "../../theme";

export const getChampionImageBorder = (avgWin: number) => {
  if (avgWin >= 50.5) return `2px solid ${theme.palette.primary.main}`;
  if (avgWin >= 50) return `2px solid khaki`;
  if (avgWin >= 49.5) return `2px solid orange`;
  return `2px solid ${theme.palette.error.main}`;
};
