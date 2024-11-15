import React from "react";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import { IconButton } from "@mui/material";

const ToggleButton = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div>
      <IconButton
        onClick={toggleSidebar}
        variant="outlined"
        color="neutral"
        size="md"
        aria-label="Toggle sidebar"
        sx={{
          display: { xs: "flex" },
          color: "white",
          transition: "background-color 0.3s ease, transform 0.3s ease", // Added smooth transition
          fontSize: "20px",
          borderRadius: "50%",
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Smooth hover effect
            transform: 'scale(1.1)', // Slight zoom effect on hover
          },
        }}
      >
        {isSidebarOpen ? <MdOutlineMenu /> : <MdMenuOpen />}
      </IconButton>
    </div>
  );
};

export default ToggleButton;
