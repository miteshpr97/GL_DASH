// src/components/MainContent.js

import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSidebar } from "../context/SidebarContext";


const MainContent = () => {
  
    const { isSidebarOpen} = useSidebar();

    return (
        <Box
            component="main"
            className="MainContent"
            sx={{
                pt: { xs: 'calc(12px + var(--Header-height))' },
                pb: { xs: 2, sm: 2, md: 0 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100vh',
                gap: 1,
                background: "#F3F4F6",
                // marginLeft: { xs: 0, md: 'var(--Sidebar-width)' },
                marginLeft: isSidebarOpen ? { xs: 0, md: 'var(--Sidebar-width)' } : 0,  // Adjust based on sidebar state
                padding: '10px',
                zIndex: 1000,
                overflow: "auto",
                transition: "margin-left 0.4s ease",  // Smooth transition
            }}
        >
            <Outlet />
        </Box>
    );
}

export default MainContent;












