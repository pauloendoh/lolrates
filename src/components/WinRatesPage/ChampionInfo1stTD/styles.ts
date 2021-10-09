import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { spacing } from "@/utils/theme";
import styled from "styled-components";

export default {
  TooltipHovearable: styled(FlexVCenter)({
    cursor: "pointer",
  }),

  ChampionNameRole: styled(Flex)({
    flexDirection: "column",
    marginLeft: spacing(1),
  }),
};
