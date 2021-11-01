import Flex from "@/components/_common/flexboxes/Flex";
import { Box } from "@material-ui/core";
import styled from "styled-components";

const S = {
  DndContainersRoot: styled(Box)(({ theme }) => ({
    overflowX: "auto",
    position: "relative",
  })),
  ContainersWrapper: styled(Flex)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  })),
};

export default S;
