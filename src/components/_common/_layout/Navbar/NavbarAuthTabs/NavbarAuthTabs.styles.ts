import { Tab } from "@material-ui/core";
import styled from "styled-components";

const S = {
  NavbarTab: styled(Tab)<{ selected: boolean }>(({ selected, theme }) => ({
    fontSize: 16,
    paddingBottom: 16,
    minWidth: "inherit",
    width: "inherit",
    color: selected ? theme.palette.primary.main : "white",
    opacity: 1,
  })),
};

export default S;
