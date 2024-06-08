import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { spacing } from "@/utils/theme";
import { Box } from "@material-ui/core";
import styled from "styled-components";

export default {
  Root: styled(Box)({
    flexGrow: 1,
    padding: 8,
  }),
  Header: styled(FlexVCenter)({
    paddingBottom: spacing(1),
    justifyContent: "space-between",
  }),

  ChampionImgs: styled(Flex)({
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: spacing(1),
  }),
};
