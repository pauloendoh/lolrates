import Flex from "@/components/UI/Flexboxes/Flex";
import myColors from "@/utils/myColors";
import { spacing } from "@/utils/theme";
import styled from "styled-components";

export default {
  Root: styled(Flex)((props: { hasBorderBottom }) => ({
    padding: `${spacing(1)} 0`,
    borderBottom: props.hasBorderBottom
      ? `1px solid ${myColors.borderColor}`
      : null,
  })),
};
