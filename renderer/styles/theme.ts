import { Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#0D47A1",
      dark: "#2196F3",
      light: "#F5F5F5",
      contrastText: "#FDE5D4",
    },
    secondary: {
      main: "#01579B",
      dark: "#03A9F4",
      light: "#B3E5FC",
      contrastText: "#F5F5F5",
    },
    error: {
      main: "#F44336",
      light: "#E57373",
    },
    success: {
      main: "#1B5E20",
      light: "#4CAF50",
    },
  },
});

export default theme;
