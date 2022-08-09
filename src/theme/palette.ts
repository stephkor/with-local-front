import createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    link: string;
  }
  interface TypeBackground {
    default: string;
    white: string;
  }

  interface PaletteOptions {
    link?: string;
    icon?: string;
    disable?: string;
    point: Record<string, string>;
  }

  interface Palette {
    link?: string;
    icon?: string;
    disable?: string;
    point: Record<string, string>;
  }
}

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
});

export default customPalette;
