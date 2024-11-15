import * as React from "react";
import { AppBar, Box } from "@mui/material";
import ColorSchemeToggle from "../components/ColorSchemeToggle";
import ToggleButton from "./ToggleButton";
import { useSidebar } from "../context/SidebarContext";

export default function Header({ onToggleTheme, mode }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <AppBar
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: isSidebarOpen 
          ? { xs: "100%", sm: "calc(100% - var(--Sidebar-width, 220px))" } 
          : "100%",  // Ensure it fills the width when sidebar is closed
          transition: "transform 0.4s ease, width 0.4s ease",

        height: "var(--Header-height)",
        zIndex: 9998,
        padding: "4px 16px",
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ToggleButton />
        <ColorSchemeToggle onClick={onToggleTheme} mode={mode} />
      </Box>
    </AppBar>
  );
}
