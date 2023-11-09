import { ITheme } from "../../interfaces";

export default function Autocomplete(theme: ITheme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
}
