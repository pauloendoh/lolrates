import myColors from "../../myColors";
import theme from "../../theme";

export const getChampionImageBorder = (avgWin: number) => {
  if (avgWin >= 51) return `2px solid ${theme.palette.primary.main}`;
  if (avgWin >= 49) return `2px solid ${myColors.ratingYellow[5]}`;
  return `2px solid ${theme.palette.error.main}`;
}