
import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const ToggleButton = () => {

  function openSidebar() {
    console.log("open sidbar");

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.setProperty(
        "--SideNavigation-slideIn",
        "1"
      );
    }
  }

  function closeSidebar() {
    console.log("close");

    if (typeof document !== "undefined") {
      document.documentElement.style.removeProperty("--SideNavigation-slideIn");
      document.body.style.removeProperty("overflow");
    }
  }

  function toggleSidebar() {
    console.log("Toggle Sidebar triggered");
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const slideIn = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--SideNavigation-slideIn");
      if (slideIn) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  }

  return (
    <div>
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="md"
        aria-label="Toggle sidebar"
        sx={{
          display: { xs: "flex" },
          color: "white",
          transition: "background-color 0.2s",
          fontSize: "8px",
          borderRadius: "0",
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </div>
  );
};

export default ToggleButton;

























