import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} isMobile={isMobile} />

      <Box width={"100%"}>
        <Navbar />
        <Box sx={{
          width: "100%",
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
