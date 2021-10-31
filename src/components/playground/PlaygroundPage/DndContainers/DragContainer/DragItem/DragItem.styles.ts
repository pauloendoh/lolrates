import { Paper, PaperProps } from "@material-ui/core";
import styled from "styled-components";

const S = {
  DragItemPaper: styled(Paper)<PaperProps & { $isDragging: boolean }>(
    (props) => ({
      padding: props.theme.spacing(1),
      width: "-webkit-fill-available",

      background: props.$isDragging ? props.theme.palette.grey[600] : "",
    })
  ),
};

export default S;
