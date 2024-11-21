import * as React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Collapse,
  useTheme,
  Divider,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { _post } from "../CommonUtilAPI/GLApiClient";
import MuiLogo from "../components/MuiLogo";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const { isSidebarOpen, closeSidebar } = useSidebar();

  const [menuData, setMenuData] = React.useState([]);
  const [openModules, setOpenModules] = React.useState(() => {
    const storedState = sessionStorage.getItem("openModules");
    return storedState ? JSON.parse(storedState) : {};
  });

  React.useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await _post("/api/Menu", {
          USER_CD: window.sessionStorage.getItem("USER_CD"),
        });
        if (response.status === 200) {
          // Update the state with the fetched menu data
          setMenuData(response.data);
          console.log("Menu data fetched successfully:", response.data);
        } else {
          console.error("Failed to fetch menu data", response.status);
        }
      } catch (error) {
        console.error("Error fetching menu data", error);
      }
    };

    fetchMenuData();
  }, []);

  if (!menuData) {
    console.log("ddd");
  }

  const groupedMenuData = menuData.reduce((acc, item) => {
    const { MODULE_NM, MENU_NM } = item;
    acc[MODULE_NM] = acc[MODULE_NM] || {};
    acc[MODULE_NM][MENU_NM] = acc[MODULE_NM][MENU_NM] || [];
    acc[MODULE_NM][MENU_NM].push(item);
    return acc;
  }, {});

  const handleToggle = (moduleCode) => {
    const newOpenModules = {
      ...openModules,
      [moduleCode]: !openModules[moduleCode],
    };
    setOpenModules(newOpenModules);
    sessionStorage.setItem("openModules", JSON.stringify(newOpenModules));
  };

  const renderMenu = (menuItems) => (
    <List size="sm" sx={{ gap: 1, "--List-nestedInsetStart": "20px" }}>
      {Object.entries(menuItems).map(([menuName, pages]) => (
        <List component="div" disablePadding key={menuName}>
          <ListItemButton
            onClick={() => handleToggle(menuName)}
            sx={{
              padding: "3px 16px",
              marginLeft: "7px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                borderRadius: `${theme.shape.borderRadius}px`,
              },
            }}
          >
            <ListAltIcon sx={{ fontSize: 16, marginRight: 0.5 }} />

            <ListItemText
              primary={menuName}
              sx={{ "& .MuiListItemText-primary": { fontSize: "0.85rem" } }}
            />
            {openModules[menuName] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openModules[menuName]} timeout="auto" unmountOnExit>
            <List component="div">
              {pages.map((page) => (
                <ListItem key={page.PAGE_CD} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={page.PAGE_LNK}
                    selected={location.pathname === page.PAGE_LNK}
                    sx={{
                      padding: "3px 16px",
                      marginLeft: "27px",
                      marginRight: "16px",
                      "&.active": {
                        backgroundColor: theme.palette.action.selected,
                        // color: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        borderRadius: `${theme.shape.borderRadius}px`,
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText
                      primary={page.PAGE_NM}
                      sx={{
                        "& .MuiListItemText-primary": { fontSize: "0.85rem" },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      ))}
    </List>
  );

  return (
    <>
      <GlobalStyles
        styles={{
          ":root": {
            "--Sidebar-width": "220px", // Set Sidebar width globally
            "--Header-height": "55px", // Set Header height globally
          },
        }}
      />
      <Drawer
        className="Sidebar"
        variant="permanent"
        anchor="left"
        sx={{
          position: "fixed",
          left: 0,
          width: "var(--Sidebar-width)",
          display: "flex",
          flexDirection: "column",
          zIndex: 9999,
          borderRight: "1px solid #ddd",
          [`& .MuiDrawer-paper`]: {
            width: "220px",
            boxSizing: "border-box",
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: "white",
            top: "unset",
            height: "100vh",
            transform: {
              // Toggle sidebar visibility based on screen size and `isSidebarOpen` state
              xs: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For small screens, toggle based on state
              sm: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For medium screens
              md: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For larger screens
            },
            transition: "transform 0.4s ease, width 0.4s ease",
          },
        }}
      >
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: isSidebarOpen ? 0.5 : 0, // Adjust opacity based on sidebar open/close
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            transition: "opacity 0.4s ease", // Smooth transition for opacity change
            transform: {
              xs: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For mobile view, toggle visibility
              lg: "translateX(-100%)", // For large screens, hide overlay
            },
          }}
          onClick={() => closeSidebar()} // Close sidebar when overlay is clicked
        />

        <span style={{ marginLeft: "10px", marginTop: "10px" }}>
          <MuiLogo />
        </span>

        <Box
          sx={{
            minHeight: 0,
            overflow: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            marginTop: "7px",
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "20px",
              padding: "0px",
            }}
          >
            <ListItem style={{ padding: "7px 10px" }}>
              <ListItemButton
                component={NavLink}
                to="/"
                selected={location.pathname === "/"}
                sx={{
                  padding: "3px 6px",
                  "&.active": {
                    backgroundColor: theme.palette.action.selected,
                    color: theme.palette.common.white,
                    borderRadius: `${theme.shape.borderRadius}px`,
                  },
                }}
              >
                <DashboardRoundedIcon
                  sx={{
                    fontSize: 17,
                    marginRight: 0.5,
                    color: (theme) => theme.palette.common.white,
                  }}
                />
                <ListItemText
                  primary="Dashboard"
                  // sx={{ "& .MuiListItemText-primary": { fontSize: "0.875rem" } }}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.875rem", // 14px
                      fontFamily: "'Roboto', sans-serif",
                      color: "white",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            {Object.entries(groupedMenuData).map(([moduleName, menuItems]) => (
              <div key={moduleName}>
                <ListItemButton
                  onClick={() => handleToggle(moduleName)}
                  sx={{
                    padding: "3px 16px",
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  <AssignmentRoundedIcon
                    sx={{
                      fontSize: 17,
                      marginRight: 0.5,

                      color: (theme) => theme.palette.common.white,
                    }}
                  />

                  <ListItemText
                    primary={moduleName}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.875rem", // 14px
                        fontFamily: "'Roboto', sans-serif",
                        color: "white",
                      },
                    }}
                  />
                  {openModules[moduleName] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openModules[moduleName]}
                  timeout="auto"
                  unmountOnExit
                >
                  {renderMenu(menuItems)}
                </Collapse>
              </div>
            ))}
          </List>
        </Box>

        {/* User section */}
        <Divider />

        <Box sx={{ display: "flex",  alignItems: "center", padding: 2 , justifyContent:"center"}}>
          <Typography >Visiwms</Typography>
        </Box>
      </Drawer>
    </>
  );
}
