import Flex from "@/components/_common/flexboxes/Flex";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

const S = {
  DragContainer: styled.div<{ hasSpacingLeft: boolean }>(
    ({ hasSpacingLeft, theme }) => ({
      minWidth: 250,
      paddingLeft: hasSpacingLeft ? theme.spacing(2) : undefined,
    })
  ),
  Paper: styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    background: theme.palette.grey[800],
    width: "100%",
  })),
  TitleWrapper: styled.div(() => ({
    cursor: "grab",
  })),
  ItemsWrapper: styled(Flex)({
    flexDirection: "column",
  }),
};

export default S;
