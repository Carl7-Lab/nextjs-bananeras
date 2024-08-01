import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  // components: {
  //   MuiTableContainer: {
  //     styleOverrides: {
  //       root: {
  //         overflowX: 'auto',
  //       },
  //     },
  //   },
  // },
});

export default muiTheme;
