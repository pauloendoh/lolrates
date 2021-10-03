import Flex from "@/components/UI/Flexboxes/Flex";
import { spacing } from "@/utils/theme";
import styled from "styled-components";

export default {
  Root: styled(Flex)({
    flexDirection: "column",
    padding: `${spacing(1)}px 0`,
    "& a": {
      fontSize: 12,
      marginTop: 4,
      color: "white",
    },

    "& a:not(:last-child)": {
      marginBottom: spacing(1),
    },
  }),
};
