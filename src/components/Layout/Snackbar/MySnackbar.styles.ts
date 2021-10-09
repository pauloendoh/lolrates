import theme from "@/utils/theme";
import styled from "styled-components";

export default {
  Root: styled.div({
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  }),
};
