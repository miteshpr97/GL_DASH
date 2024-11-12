import { createTheme } from '@mui/material/styles';

// Define custom theme
const theme = createTheme({
  palette: {
    mode: 'light',  // You can toggle between 'light' and 'dark'
    primary: {
      main: '#4c5bb5', // Softer primary color
    },
    secondary: {
      main: '#25365e', // Softer secondary color
    },
    background: {
      default: '#fafafa',  // Off-white background
      paper: '#eceff1',    // Light gray background for Paper component
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',  // Custom font family
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  spacing: 8,  // Base spacing unit (used for margins/padding)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // Removes uppercase styling on buttons
          borderRadius: '2px',    // Custom border radius for buttons
          padding: '10px 20px',   // Custom padding for buttons
          '&:hover': {
            backgroundColor: '#2f3b91', // Darker primary shade for hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Custom Paper shadow
        },
      },
    },
  },
});

export default theme;
