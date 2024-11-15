// import * as React from "react";
// import GlobalStyles from "@mui/material/GlobalStyles";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box,
//   Collapse,
//   useTheme,
//   Divider,
//   Typography,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import { NavLink, useLocation } from "react-router-dom";
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
// import Cookies from "js-cookie";
// import userContext from "../context/userContext/userContext";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
// import { closeSidebar } from "../utils";
// import { _post } from "../CommonUtilAPI/GLApiClient";
// import MuiLogo from "../components/MuiLogo";


// export default function Sidebar() {



//   const theme = useTheme();
//   const location = useLocation();

//   const [openModules, setOpenModules] = React.useState(() => {
//     const storedState = sessionStorage.getItem("openModules");
//     return storedState ? JSON.parse(storedState) : {};
//   });

//   const { user } = React.useContext(userContext);

//   function getInitials(name) {
//     if (!name) {
//       return "...";
//     }
//     const words = name.split(" ");
//     let initials = "";
//     for (let i = 0; i < words.length; i++) {
//       initials += words[i].charAt(0).toUpperCase();
//     }
//     return initials;
//   }

//   const logout = async () => {
//     const isOkay = window.confirm("You are about to be logged out");
//     if (isOkay) {
//       Cookies.remove("authToken");
//       window.location.reload();
//     }
//   };

//   const [menuData, setMenuData] = React.useState([]);

//   React.useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await _post("/api/Menu", {
//           USER_CD: window.sessionStorage.getItem("USER_CD"),
//         });
//         if (response.status === 200) {
//           // Update the state with the fetched menu data
//           setMenuData(response.data);
//           console.log("Menu data fetched successfully:", response.data);
//         } else {
//           console.error("Failed to fetch menu data", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching menu data", error);
//       }
//     };

//     fetchMenuData();
//   }, []);

//   if (!menuData) {
//     console.log("ddd");
//   }

//   const groupedMenuData = menuData.reduce((acc, item) => {
//     const { MODULE_NM, MENU_NM } = item;
//     acc[MODULE_NM] = acc[MODULE_NM] || {};
//     acc[MODULE_NM][MENU_NM] = acc[MODULE_NM][MENU_NM] || [];
//     acc[MODULE_NM][MENU_NM].push(item);
//     return acc;
//   }, {});

//   const handleToggle = (moduleCode) => {
//     const newOpenModules = {
//       ...openModules,
//       [moduleCode]: !openModules[moduleCode],
//     };
//     setOpenModules(newOpenModules);
//     sessionStorage.setItem("openModules", JSON.stringify(newOpenModules));
//   };

//   const renderMenu = (menuItems) => (
//     <List size="sm" sx={{ gap: 1, "--List-nestedInsetStart": "20px" }}>
//       {Object.entries(menuItems).map(([menuName, pages]) => (
//         <List component="div" disablePadding key={menuName}>
//           <ListItemButton
//             onClick={() => handleToggle(menuName)}
//             sx={{
//               padding: "3px 16px",
//               marginLeft: "7px",
//               "&:hover": { backgroundColor: theme.palette.action.hover },
//               "&.Mui-selected": {
//                 backgroundColor: theme.palette.action.selected,
//                 borderRadius: `${theme.shape.borderRadius}px`,
//               },
//             }}
//           >
//             <ListAltIcon sx={{ fontSize: 16, marginRight: 0.5 }} />

//             <ListItemText
//               primary={menuName}
//               sx={{ "& .MuiListItemText-primary": { fontSize: "0.85rem" } }}
//             />
//             {openModules[menuName] ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//           <Collapse in={openModules[menuName]} timeout="auto" unmountOnExit>
//             <List component="div">
//               {pages.map((page) => (
//                 <ListItem key={page.PAGE_CD} disablePadding>
//                   <ListItemButton
//                     component={NavLink}
//                     to={page.PAGE_LNK}
//                     selected={location.pathname === page.PAGE_LNK}
//                     sx={{
//                       padding: "3px 16px",
//                       marginLeft: "27px",
//                       marginRight: "16px",
//                       "&.active": {
//                         backgroundColor: theme.palette.action.selected,
//                         // color: theme.palette.primary.main,
//                         color: theme.palette.common.white,
//                         borderRadius: `${theme.shape.borderRadius}px`,
//                       },
//                       "&:hover": {
//                         backgroundColor: theme.palette.action.hover,
//                       },
//                     }}
//                   >
//                     <ListItemText
//                       primary={page.PAGE_NM}
//                       sx={{
//                         "& .MuiListItemText-primary": { fontSize: "0.85rem" },
//                       }}
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>
//         </List>
//       ))}
//     </List>
//   );

//   // let abc = true
//   return (
//     <Drawer
//       className="Sidebar"
//       variant="permanent"
//       anchor="left"
//       sx={{
//         position: "fixed",
//         // top: 55,
//         left: 0,
//         transform: {
//           xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
//           md: "none",
//           // md: abc ?  "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))" : "none"

//         },
//         transition: "transform 0.4s ease, width 0.4s ease",
//         width: "var(--Sidebar-width)",
//         display: "flex",
//         flexDirection: "column",
//         zIndex: 9999,
//         borderRight: "1px solid #ddd",
//         [`& .MuiDrawer-paper`]: {
//           width: "220px",
//           boxSizing: "border-box",

//           backgroundColor: (theme) => theme.palette.secondary.main,
//           color: "white",

//           top: "unset",

//           height: "100vh",
//         },
//       }}
//     >
//       <GlobalStyles
//         styles={{
//           ":root": {
//             "--Sidebar-width": "220px",
//             "--Header-height": "55px",
//           },
//         }}
//       />

//       <Box
//         className="Sidebar-overlay"
//         sx={{
//           position: "fixed",
//           zIndex: 9998,
//           top: 0,
//           left: 0,
//           width: "100vw",

//           height: "100vh",
//           opacity: "var(--SideNavigation-slideIn)",
//           backgroundColor: "rgba(128, 128, 128, 0.5)",

//           transform: {
//             xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
//             lg: "translateX(-100%)",
//           },
//         }}
//         onClick={() => closeSidebar()}
//       />
//       <span style={{marginLeft:"20px", marginTop:"10px"}}>
//         <MuiLogo />
//       </span>

     

//       <Box
//         sx={{
//           minHeight: 0,
//           overflow: "auto",
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           marginTop: "7px",
//         }}
//       >
//         <List
//           size="sm"
//           sx={{
//             gap: 1,
//             "--List-nestedInsetStart": "20px",
//             padding: "0px",
//           }}
//         >
//           <ListItem style={{ padding: "7px 10px" }}>
//             <ListItemButton
//               component={NavLink}
//               to="/"
//               selected={location.pathname === "/"}
//               sx={{
//                 padding: "3px 6px",
//                 "&.active": {
//                   backgroundColor: theme.palette.action.selected,
//                   color: theme.palette.common.white,
//                   borderRadius: `${theme.shape.borderRadius}px`,
//                 },
//               }}
//             >
//               <DashboardRoundedIcon
//                 sx={{
//                   fontSize: 17,
//                   marginRight: 0.5,
//                   color: (theme) => theme.palette.common.white,
//                 }}
//               />
//               <ListItemText
//                 primary="Dashboard"
//                 // sx={{ "& .MuiListItemText-primary": { fontSize: "0.875rem" } }}
//                 sx={{
//                   "& .MuiListItemText-primary": {
//                     fontSize: "0.875rem", // 14px
//                     fontFamily: "'Roboto', sans-serif",
//                     color: "white",
//                   },
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>

//           {Object.entries(groupedMenuData).map(([moduleName, menuItems]) => (
//             <div key={moduleName}>
//               <ListItemButton
//                 onClick={() => handleToggle(moduleName)}
//                 sx={{
//                   padding: "3px 16px",
//                   "&:hover": { backgroundColor: theme.palette.action.hover },
//                 }}
//               >
//                 <AssignmentRoundedIcon
//                   sx={{
//                     fontSize: 17,
//                     marginRight: 0.5,

//                     color: (theme) => theme.palette.common.white,
//                   }}
//                 />

//                 <ListItemText
//                   primary={moduleName}
//                   sx={{
//                     "& .MuiListItemText-primary": {
//                       fontSize: "0.875rem", // 14px
//                       fontFamily: "'Roboto', sans-serif",
//                       color: "white",
//                     },
//                   }}
//                 />
//                 {openModules[moduleName] ? <ExpandLess /> : <ExpandMore />}
//               </ListItemButton>
//               <Collapse
//                 in={openModules[moduleName]}
//                 timeout="auto"
//                 unmountOnExit
//               >
//                 {renderMenu(menuItems)}
//               </Collapse>
//             </div>
//           ))}
//         </List>
//       </Box>

//       {/* User section */}
//       <Divider />

//       <Box sx={{ display: "flex", gap: 1, alignItems: "center", padding: 2 }}>
//         <Avatar sx={{ width: 32, height: 32 }}>
//           {user && getInitials(user.name)}
//         </Avatar>
//         <Box sx={{ minWidth: 0, flex: 1 }}>
//           <Typography
//             variant="body2"
//             sx={{
//               fontWeight: "bold",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {user ? user.name : "Guest"}
//           </Typography>
//           <Typography
//             variant="caption"
//             sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
//           >
//             {user ? user.email : ""}
//           </Typography>
//         </Box>
//         <IconButton onClick={logout} size="small">
//           <LogoutRoundedIcon fontSize="small" />
//         </IconButton>
//       </Box>
//     </Drawer>
//   );
// }

import * as React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Box, Drawer, List } from "@mui/material";
import MuiLogo from "../components/MuiLogo";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

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
        {/* Overlay for small screens */}
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

        {/* Sidebar content */}
        <span style={{ marginLeft: "20px", marginTop: "10px" }}>
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









          </List>
        </Box>
      </Drawer>
    </>
  );
}
