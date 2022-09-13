import createPalette from "@mui/material/styles/createPalette";

const customPalette = createPalette({
  text: {
    primary: "#222222",
  },
  background: {
    default: "#f2f3f8",
    white: "#ffffff",
  },
  error: {
    main: "#ff5a5f",
    contrastText: "#222222",
  },
  point: {
    blue: "#0044ff",
    marigold: "#ffc400",
    browngrey: "#888888",
  },
  primary: {
    main: "#04f"
  }
});

export default customPalette;
