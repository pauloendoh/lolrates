import theme from "@/utils/theme";
import { Box, styled } from "@material-ui/core";

export default {
  Root: styled(Box)({
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  }),
};
