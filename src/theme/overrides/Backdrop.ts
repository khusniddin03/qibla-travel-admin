import { alpha } from '@mui/material/styles';
import { ITheme } from '../../interfaces';

// ----------------------------------------------------------------------

export default function Backdrop(theme: ITheme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
