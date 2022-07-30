import createTypography from "@mui/material/styles/createTypography";
import palette from "./palette";

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    h1: Record<string, string | number>;
    nanum36pt2: Record<string, string | number>;
    nanum24pt: Record<string, string | number>;
    nanum18pt: Record<string, string | number>;
    nanum18pt2: Record<string, string | number>;
    nanum14pt: Record<string, string | number>;
    nanum12pt: Record<string, string | number>;
    nanum10pt: Record<string, string | number>;
    nanum10pt2: Record<string, string | number>;
    nanum10pt3: Record<string, string | number>;
  }
  interface Typography {
    h1: Record<string, string | number>;
    nanum36pt2: Record<string, string | number>;
    nanum24pt: Record<string, string | number>;
    nanum18pt: Record<string, string | number>;
    nanum18pt2: Record<string, string | number>;
    nanum14pt: Record<string, string | number>;
    nanum12pt: Record<string, string | number>;
    nanum10pt: Record<string, string | number>;
    nanum10pt2: Record<string, string | number>;
    nanum10pt3: Record<string, string | number>;
  }
}

const customTypography = createTypography(palette, {
  fontFamily: ["NanumSquare",].join(","),
  h1: {
    color: palette.text.primary,
    fontSize: "2.25rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
  },
  nanum36pt2: {
    color: palette.text.primary,
    fontSize: "2.25rem",
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
  },
  nanum24pt: {
    color: palette.text.primary,
    fontSize: "1.5rem",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  nanum18pt: {
    color: palette.text.primary,
    fontSize: "1.125rem",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  nanum18pt2: {
    color: palette.text.primary,
    fontSize: "1.125rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.78,
    letterSpacing: "normal",
  },
  nanum14pt: {
    color: palette.text.primary,
    fontSize: "0.875rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
  },
  nanum12pt: {
    color: palette.text.primary,
    fontSize: "0.75rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2,
    letterSpacing: "normal",
  },
  nanum10pt3: {
    color: palette.text.primary,
    fontSize: "0.625rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  nanum10pt2: {
    color: palette.point.marigold,
    fontSize: "0.625rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  nanum10pt: {
    color: palette.point.browngrey,
    fontSize: "0.625rem",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  body1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "21px",
  },
  body2: {
    color: palette.text.secondary,
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
  },
  button: {
    color: palette.text.primary,
    fontWeight: 700,
    fontSize: "14px",
  },
  caption: {
    color: palette.text.secondary,
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "14px",
  },
  overline: {
    color: palette.text.secondary,
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "14px",
    textTransform: "uppercase",
  },
});

export default customTypography;
