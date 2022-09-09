import { Components } from "@mui/material";
import { colors } from "@mui/material";
import typography from "./typography";
import palette from "./palette";
import { ROOT_LAYOUT_MIN_WIDTH } from "../config/layout";

const customComponents = {
  MuiAppBar: {
    styleOverrides: {
      positionFixed: {
        top: 0,
        right: 0,
        left: 0,
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(255,255,255,0.6)",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      contained: {
        boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14)",
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        "&:last-child": {
          paddingBottom: 16,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: colors.blueGrey[50],
        color: colors.blueGrey[900],
      },
      label: {
        fontWeight: 700,
      },
      deletable: {
        "&:focus": {
          backgroundColor: colors.blueGrey[100],
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {
        minWidth: ROOT_LAYOUT_MIN_WIDTH,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: 16,
      },
      dividers: {
        padding: 16,
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 16,
        "& > h2": {
          ...typography.h5,
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: palette.icon,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.03)",
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        "&::placeholder": {
          opacity: 1,
          color: palette.text.secondary,
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
      colorPrimary: {
        backgroundColor: colors.blueGrey[50],
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      button: {
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: palette.icon,
        minWidth: 32,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: "rgba(0,0,0,0.15)",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      elevation1: {
        boxShadow:
          "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        ...typography.body1,
        borderBottom: `1px solid ${palette.divider}`,
      },
      head: {
        ...typography.h6,
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        "&$selected": {
          backgroundColor: palette.background.default,
        },
        "&$hover": {
          "&:hover": {
            backgroundColor: palette.background.default,
          },
        },
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        color: palette.icon,
        "&:hover": {
          backgroundColor: "rgba(208, 208, 208, 0.20)",
        },
        "&$selected": {
          backgroundColor: "rgba(208, 208, 208, 0.20)",
          color: palette.primary.main,
          "&:hover": {
            backgroundColor: "rgba(208, 208, 208, 0.30)",
          },
        },
        "&:first-child": {
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        },
        "&:last-child": {
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      gutterBottom: {
        marginBottom: 8,
      },
    },
  },
};

export default customComponents;
