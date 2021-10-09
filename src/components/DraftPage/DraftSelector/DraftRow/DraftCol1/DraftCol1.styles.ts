import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import myColors from "utils/myColors";
import theme from "utils/theme";

export default {
  Root: styled(Flex)(() => ({
    minWidth: 216,
    minHeight: 216,
  })),

  QuestionMarkWrapper: styled(FlexVCenter)({
    justifyContent: "center",
    height: 48,
    minWidth: 48,
    background: myColors.dark.lightDark,
    borderRadius: 48,
  }),

  InfoColumn: styled(Box)({
    width: "100%",
  }),

  RoleNameWrapper: styled(FlexVCenter)({
    justifyContent: "space-between",
  }),

  InfoColContent: styled(Box)({
    marginTop: theme.spacing(1),
  }),

  RatesWrapper: styled(Flex)({
    flexDirection: "column",
    marginTop: theme.spacing(1),
  }),
};
