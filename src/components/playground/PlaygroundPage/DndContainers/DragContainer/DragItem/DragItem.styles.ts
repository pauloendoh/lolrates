import { Paper, PaperProps } from "@material-ui/core";
import styled from "styled-components";

const S = {
  DragItemRoot: styled.div(({ theme }) => ({
    paddingTop: theme.spacing(1),
    position: "relative",
    display: "flex",
    gap: theme.spacing(1),
  })),
  DragHandleWrapper: styled.div(({ theme }) => ({
    cursor: "grab",
    position: "relative",
    top: 6,
  })),
  DragItemPaper: styled(Paper)<PaperProps & { $isDragging: boolean }>(
    (props) => ({
      padding: props.theme.spacing(1),
      width: "-webkit-fill-available",

      background: props.$isDragging ? props.theme.palette.grey[600] : "",
    })
  ),
};

export default S;
