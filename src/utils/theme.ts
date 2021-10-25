import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#2B2B2B",
    },
    primary: { main: "#3DAC8D", contrastText: "#fff" },
    secondary: { main: "#C862AC" },
  },
  typography: {
    // fontFamily: `'Open Sans', sans-serif;`, // imported at index.css
    fontFamily: `'Noto Sans', sans-serif;`, // imported at index.css
    fontSize: 13,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  overrides: {
    MuiTextField: {
      root: {},
    },
    MuiSelect: {
      root: {
        background: "#1E1E1E",
      },
    },
    MuiToolbar: {
      root: {
        paddingLeft: 32,
        paddingRight: 32,
      },
    },
    MuiTooltip: {
      arrow: { color: "#292929" },
      tooltip: {
        backgroundColor: "#292929",
      },
    },
    MuiLink: {
      root: {
        cursor: "pointer",
      },
    },
  },
});

export default theme;

export const { spacing } = theme;
