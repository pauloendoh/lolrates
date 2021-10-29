import theme from "@/utils/theme";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

const S = {
  DragItemPaper: styled(Paper)<{ isDragging?: boolean }>((props) => ({
    padding: theme.spacing(1),
    cursor: "grab",
    // border: props.isDragging
    //   ? "1px dashed rgba(255, 255, 255, 0.2)"
    //   : undefined,
    background: props.isDragging ? theme.palette.grey[600] : "",
  })),
};

export default S;
