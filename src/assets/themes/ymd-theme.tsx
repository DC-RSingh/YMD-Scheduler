/**
 * App wide colors applied to many components. Controls the color scheme of the app,
 * changing values here affects the app's whole aesthetic. 
 */
import {
    amber,
    blue,
    deepOrange,
    deepPurple,
    green,
    grey,
    lime,
    orange,
    pink,
    red,
    teal,
  } from '@mui/material/colors';
  import { createTheme } from '@mui/material/styles';
  import {Theme} from "@mui/material/styles/createTheme";

  declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
  }
  
  const defaultTheme = createTheme({ palette: { mode: 'dark' } });
  
  const primaryLight = '#0E95E3';
  const primaryMain = '#48B9FA';
  const primaryDark = '#0E9AEB';
  
  const infoLight = '#d3d3d3';
  const infoMain = '#c9c9c9';
  const infoDark = '#b5b5b5';
  
  export const primaryLighter = '#45A1D6';
  export const primaryDarker = '#3A789C';
  export const primaryDarkest = '#2C6485';
  
  export const fontColors = {
    hintDarker: 'rgba(255, 255, 255, 0.2)',
  };
  
  export const highchartsColors = [
    primaryMain,
    deepOrange[300],
    orange[300],
    lime[300],
    teal[300],
    amber[300],
    deepPurple[300],
    pink[300],
    blue[300],
  ];
  
  export const secondary = {
    light: '#4e4e4e',
    main: '#1e1e1e',
    dark: '#000',
  };
  
  export const gridSpacing = 2;
  
  export const statusColors = {
    success: green[800],
    warning: amber[900],
    info: grey[900],
    error: red[900],
  };
  
  export const background = {
    default: '#151515',
    paper: '#202020',
    darker: '#0e0e0e',
  };

  export type StatusColor = typeof statusColors;
  
  export const primaryGradient = `linear-gradient(90deg, ${primaryDark} 0%, ${primaryMain} 35%, ${primaryDarkest} 100%)`;
  
  export default function ymdTheme(): Theme {
    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1300,
          xl: 1950,
        },
      },
      components: {
        MuiToolbar: {
          styleOverrides: {
            gutters: {
              [defaultTheme.breakpoints.up('xs')]: {
                paddingLeft: '8px',
                paddingRight: 0,
              },
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              // todo: test
              '&.Mui-hovered': {
                backgroundColor: defaultTheme.palette.background.default,
              },
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              fontSize: '0.75rem',
            },
          },
        },
        MuiFormControlLabel: {
          styleOverrides: {
            root: {
              color: '#c2c2c2',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
      palette: {
        text: {
          primary: '#fff',
          secondary: '#c2c2c2',
        },
        primary: {
          light: primaryLight,
          main: primaryMain,
          dark: primaryDark,
        },
        secondary: secondary,
        background: background,
        info: {
          light: infoLight,
          main: infoMain,
          dark: infoDark,
        },
        mode: 'dark',
      },
      typography: {
        h6: {
          fontWeight: 400,
          fontSize: '1.15rem',
        },
      },
      transitions: {
        duration: {
          enteringScreen: 0,
          leavingScreen: 0,
        },
      },
    });
  }
  