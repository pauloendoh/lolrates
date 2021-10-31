import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { AppBar, styled } from "@material-ui/core";

export default {
  AppBar: styled(AppBar)({
    flexGrow: 1,
    background: "#202020",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    zIndex: 1201,
  }),
  LeftIcons: styled(FlexVCenter)({}),
  RightIcons: styled(FlexVCenter)({}),
};
