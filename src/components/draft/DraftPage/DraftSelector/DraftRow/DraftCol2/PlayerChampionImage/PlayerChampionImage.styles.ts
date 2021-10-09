import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { Box } from "@material-ui/core";
import styled from "styled-components";

export default {
  ChampionImgWrapper: styled(Box)({
    position: "relative",
  }),

  DeleteIconWrapper: styled(FlexVCenter)({
    position: "absolute",
    width: 14,
    height: 14,
    backgroundColor: "white",
    justifyContent: "center",
    right: 0,
    top: 0,
    borderRadius: 14,
    cursor: "pointer",
  }),

  EditIconWrapper: styled(FlexVCenter)({
    position: "absolute",
    width: 14,
    height: 14,
    backgroundColor: "white",
    justifyContent: "center",
    right: 0,
    bottom: 0,
    borderRadius: 14,
    cursor: "pointer",
  }),
};
