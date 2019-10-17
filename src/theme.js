import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffff02",
    },
    error: {
      main: red.A400,
    },
    background: {
      darker: "#f2f2f2",
    },
  },
});

export default theme;
