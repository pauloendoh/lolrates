import myColors from "../../../consts/myColors";
import theme from "../../../consts/theme";

export const getChampionImageBorder = (avgWin: number) => {
  if (avgWin >= 51) return `2px solid ${theme.palette.primary.main}`;
  if (avgWin >= 49) return `2px solid ${myColors.ratingYellow[5]}`;
  return `2px solid ${theme.palette.error.main}`;
}