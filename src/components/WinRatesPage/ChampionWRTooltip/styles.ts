import Flex from "@/components/_common/flexboxes/Flex";
import theme, { spacing } from "@/utils/theme";
import { Button } from "@material-ui/core";
import styled from "styled-components";

export default {
  TooltipContent: styled(Flex)({
    flexDirection: "column",
    padding: `${spacing(1)}px 0px`,
    "& a": {
      fontSize: 12,
      marginTop: 4,
      color: "white",
    },

    "& a:not(:last-child)": {
      marginBottom: spacing(1),
    },
  }),

  TextButton: styled(Button)((props: { isHovering: "Pick" | "Win" }) => ({
    textDecoration: "underline",
    color:
      props.isHovering === "Pick"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  })),
};
