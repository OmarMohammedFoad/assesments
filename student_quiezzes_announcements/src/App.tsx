import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import requireAuth from './hoc/requireAuth';
import { Dashboard } from './pages/Dashboard';
import { Layout } from './pages/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const ProtectedDashboard = requireAuth(Dashboard);

function App() {


  let router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'dashboard',
          element: <ProtectedDashboard />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
