import Flex from "@/components/_common/flexboxes/Flex";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import myColors from "utils/myColors";
import theme from "utils/theme";

export default {
  Root: styled(Box)({
    minWidth: 216,
    minHeight: 128,
    padding: 8,
    borderRight: myColors.border,
    borderLeft: myColors.border,
  }),

  ColContent: styled(Flex)({
    flexDirection: "column",
    gap: 24,
    marginBottom: theme.spacing(1),
  }),

  ChampionsWrapper: styled(Flex)({
    flexDirection: "column",
  }),

  ChampionImgs: styled(Flex)({
    flexWrap: "wrap",
    gap: 8,
  }),
};
