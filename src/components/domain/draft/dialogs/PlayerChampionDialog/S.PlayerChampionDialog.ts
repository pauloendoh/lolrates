import { spacing } from "@/utils/theme";
import { Box, styled } from "@material-ui/core";
import FlexVCenter from "components/UI/Flexboxes/FlexVCenter";

export default {

  SelectorLine: styled(FlexVCenter)(() => ({
    gap: 8,
  })),

  ChampionRadarWrapper: styled(Box)({
    marginTop: spacing(5),
    width: 'fit-content',
    margin: '0 auto'
  }),

  RadarInputsWrapper: styled(Box)({position: 'relative'})
};
