import React from 'react';
import { CssBaseline, Theme, ThemeOptions } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import { ICustomShadows } from '../interfaces';

interface TypeProps {

}

interface ITheme extends Theme {
  customShadows: ICustomShadows
}

export default function ThemeProvider({ children }: React.PropsWithChildren<TypeProps>) {
  const themeOptions = {
    palette,
    shape: { borderRadius: 6 },
    typography,
    shadows: shadows(),
    customShadows: customShadows(),
  } as unknown as ThemeOptions;

  const theme: Theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme as ITheme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
