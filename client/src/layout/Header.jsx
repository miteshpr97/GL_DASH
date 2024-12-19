import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Popper,
  Paper,
  ClickAwayListener,
  Stack,
  Fade,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ToggleButton from "./ToggleButton";
import { useSidebar } from "../context/SidebarContext";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Cookies from "js-cookie";
import userContext from "../context/userContext/userContext";


export default function Header() {
  const { isSidebarOpen } = useSidebar();
  const { user } = React.useContext(userContext);

  // State to manage the Popper
  const [anchorEl, setAnchorEl] = useState(null);

  // Toggle Popper
  const handleChipClick = (event) => {
    event.stopPropagation(); // Prevent ClickAwayListener from triggering
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle open/close
  };

  // Close the Popper
  const handlePopperClose = (event) => {
    console.log("ClickAwayListener event target:", event.target);
    setAnchorEl(null);
  };



  
  function getInitials(name) {
    if (!name) {
      return "...";
    }
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      initials += words[i].charAt(0).toUpperCase();
    }
    return initials;
  }


  const logout = async () => {
    const isOkay = window.confirm("You are about to be logged out");
    if (isOkay) {
      // Cookies.remove("authToken");
      sessionStorage.removeItem("authToken");

      window.location.reload();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popper" : undefined;

  return (
    <AppBar
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: isSidebarOpen
          ? { xs: "100%", sm: "calc(100% - var(--Sidebar-width, 220px))" }
          : "100%",
        transition: "transform 0.4s ease, width 0.4s ease",
        height: "var(--Header-height)",
        padding: "4px 16px",
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "none",
        // // background:"red",
        // zIndex: 10000,      
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <ToggleButton />

        {/* User Chip and Popper */}
        <Stack direction="row" spacing={1}>
          <Chip
            sx={{
              height: "38px",
              alignItems: "center",
              borderRadius: "27px",
              transition: "all .2s ease-in-out",
              "&:hover": {
                backgroundColor: "primary.light",
              },
              "& .MuiChip-label": {
                lineHeight: 0,
              },
            }}
            avatar={<Avatar>M</Avatar>}
            label="Avatar"
            onClick={handleChipClick}
          />

          {/* ClickAwayListener to handle clicks outside the Popper */}
          <ClickAwayListener onClickAway={handlePopperClose}>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="bottom-end"
              sx={{ zIndex: 1300 }}
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 10],
                  },
                },
              ]}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "8px",
                      minWidth: "180px",
                      backgroundColor: "rgb(255, 255, 255)",
                    }}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <SettingsRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </ClickAwayListener>
        </Stack>
      </Box>
    </AppBar>
  );
}
