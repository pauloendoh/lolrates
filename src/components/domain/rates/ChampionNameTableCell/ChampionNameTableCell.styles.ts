import Flex from "@/components/UI/Flexboxes/Flex";
import FlexVCenter from "@/components/UI/Flexboxes/FlexVCenter";
import styled from "styled-components";

export default {
  TooltipHovearable: styled(FlexVCenter)({
    cursor: "pointer",
  }),

  ChampionNameRole: styled(Flex)({
    flexDirection: "column",
  }),
};
