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

// import * as React from "react";
// import GlobalStyles from "@mui/material/GlobalStyles";
// import { Box, Drawer, List } from "@mui/material";
// import MuiLogo from "../components/MuiLogo";
// import { useSidebar } from "../context/SidebarContext";

// export default function Sidebar() {
//   const { isSidebarOpen, closeSidebar } = useSidebar();

//   return (
//     <>
//       <GlobalStyles
//         styles={{
//           ":root": {
//             "--Sidebar-width": "220px", // Set Sidebar width globally
//             "--Header-height": "55px", // Set Header height globally
//           },
//         }}
//       />

//       <Drawer
//         className="Sidebar"
//         variant="permanent"
//         anchor="left"
//         sx={{
//           position: "fixed",
//           left: 0,
//           width: "var(--Sidebar-width)",
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 9999,
//           borderRight: "1px solid #ddd",
//           [`& .MuiDrawer-paper`]: {
//             width: "220px",
//             boxSizing: "border-box",
//             backgroundColor: (theme) => theme.palette.secondary.main,
//             color: "white",
//             top: "unset",
//             height: "100vh",
//             transform: {
//               // Toggle sidebar visibility based on screen size and `isSidebarOpen` state
//               xs: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For small screens, toggle based on state
//               sm: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For medium screens
//               md: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For larger screens
//             },
//             transition: "transform 0.4s ease, width 0.4s ease",
//           },
//         }}
//       >
//         {/* Overlay for small screens */}
//         <Box
//           className="Sidebar-overlay"
//           sx={{
//             position: "fixed",
//             zIndex: 9998,
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             opacity: isSidebarOpen ? 0.5 : 0, // Adjust opacity based on sidebar open/close
//             backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
//             transition: "opacity 0.4s ease", // Smooth transition for opacity change
//             transform: {
//               xs: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", // For mobile view, toggle visibility
//               lg: "translateX(-100%)", // For large screens, hide overlay
//             },
//           }}
//           onClick={() => closeSidebar()} // Close sidebar when overlay is clicked
//         />

//         {/* Sidebar content */}
//         <span style={{ marginLeft: "20px", marginTop: "10px" }}>
//           <MuiLogo />
//         </span>

//         <Box
//           sx={{
//             minHeight: 0,
//             overflow: "auto",
//             flexGrow: 1,
//             display: "flex",
//             flexDirection: "column",
//             marginTop: "7px",
//           }}
//         >
//           <List
//             size="sm"
//             sx={{
//               gap: 1,
//               "--List-nestedInsetStart": "20px",
//               padding: "0px",
//             }}
//           >









//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// }

































// import * as React from "react";
// import GlobalStyles from "@mui/material/GlobalStyles";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Box,
//   useTheme,
// } from "@mui/material";
// import { NavLink, useLocation } from "react-router-dom";
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
// import MuiLogo from "../components/MuiLogo";
// import { useSidebar } from "../context/SidebarContext";

// export default function Sidebar() {
//   const { isSidebarOpen, closeSidebar } = useSidebar();
//   const theme = useTheme();
//   const location = useLocation();

//   return (
//     <>
//       {/* Global styles for CSS variables */}
//       <GlobalStyles
//         styles={{
//           ":root": {
//             "--Sidebar-width": isSidebarOpen ? "220px" : "80px", // Sidebar width adjusts based on open state
//             "--Header-height": "55px",
//           },
//         }}
//       />

//       {/* Sidebar Drawer */}
//       <Drawer
//         className="Sidebar"
//         variant="permanent"
//         anchor="left"
//         sx={{
//           position: "fixed",
//           left: 0,
//           width: "var(--Sidebar-width)",
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 1200,
//           borderRight: `1px solid ${theme.palette.divider}`,
//           [`& .MuiDrawer-paper`]: {
//             width: "var(--Sidebar-width)",
//             boxSizing: "border-box",
//             backgroundColor: theme.palette.secondary.main,
//             color: theme.palette.common.white,
//             top: 0,
//             height: "100vh",
//             transition: "transform 0.4s ease, width 0.4s ease",
//             overflowX: "hidden",
//           },
//         }}
//       >
//         {/* Overlay for mobile view */}
//         <Box
//           className="Sidebar-overlay"
//           sx={{
//             position: "fixed",
//             zIndex: 1100,
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             opacity: isSidebarOpen ? 0.5 : 0,
//             visibility: isSidebarOpen ? "visible" : "hidden",
//             transition: "opacity 0.4s ease",
//           }}
//           onClick={closeSidebar}
//         />

//         {/* Logo Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             padding: isSidebarOpen ? "20px" : "10px",
//             justifyContent: isSidebarOpen ? "flex-start" : "center",
//           }}
//         >
//           <MuiLogo />
//         </Box>

//         {/* Navigation Links */}
//         <Box
//           sx={{
//             flexGrow: 1,
//             overflowY: "auto",
//             display: "flex",
//             flexDirection: "column",
//             marginTop: "8px",
//           }}
//         >
//           <List
//             sx={{
//               padding: "0px",
//               "--List-nestedInsetStart": isSidebarOpen ? "20px" : "0px",
//             }}
//           >
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={NavLink}
//                 to="/"
//                 selected={location.pathname === "/"}
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   "&.active": {
//                     backgroundColor: theme.palette.action.selected,
//                     color: theme.palette.common.white,
//                     borderRadius: `${theme.shape.borderRadius}px`,
//                   },
//                 }}
//               >
//                 <DashboardRoundedIcon
//                   sx={{
//                     fontSize: 24,
//                     mr: isSidebarOpen ? 1 : 0,
//                     color: theme.palette.common.white,
//                   }}
//                 />
//                 {isSidebarOpen && (
//                   <ListItemText
//                     primary="Dashboard"
//                     sx={{
//                       "& .MuiListItemText-primary": {
//                         fontSize: "0.875rem",
//                         fontFamily: "'Roboto', sans-serif",
//                         color: "white",
//                       },
//                     }}
//                   />
//                 )}
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// }









// // for use standard input field 
//                 {/* <TableBody>
//                   {tableData.map((data, rowIndex) => (
//                     <TableRow key={rowIndex}>
//                       {Object.entries(data).map(([key, value]) => (
//                         <TableCell
//                           key={key}
//                           sx={{
//                             padding: "8px 10px",
//                             fontSize: "12px",
//                           }}
//                         >
//                           <TextField
//                             fullWidth
//                             value={value}
//                             onChange={(event) =>
//                               handleTableChange(event, rowIndex, key)
//                             }
//                             sx={{
//                               "& .MuiInputBase-input": {
//                                 fontSize: "11px",
//                                 padding: "2px 5px",
//                               },
//                             }}
//                           />
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody> */}









                  
//                 <TableBody>
//                   {tableData.map((data, rowIndex) => (
//                     <TableRow key={rowIndex}>
//                       {moduleName.map((column, colIndex) => (
//                         <TableCell key={colIndex} style={tableStyles.cell}>
//                           {column.readonly ? (
//                             data[column.id] // Display the value if readonly
//                           ) : (
//                             <TextField
//                               fullWidth
//                               value={data[column.id]}
//                               // variant="standard"
//                               onChange={(event) =>
//                                 handleTableChange(event, rowIndex, column.id)
//                               }
//                               size="small"
//                               sx={{
//                                 "& .MuiInputBase-input": {
//                                   fontSize: "11px",
//                                   padding: "2px 5px",
//                                 },
//                               }}
//                             />
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody> 










































// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import CommonBtn from "../../../components/CustomBtn/CommonBtn";
// import CustomPagination from "../../../components/CustomPagination";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserCreationData,
// } from "../../../features/userCreationSlice";
// import ProfilePhoto from "../../../assets/profilepic2.jpg";
// import AccessTable from "./Access";

// const GLCMA100200 = () => {
//   const dispatch = useDispatch();

//   const userColumns = [
//     { id: "EMP_CD", label: "EMP_CD", minWidth: 70 },
//     { id: "EMP_NM", label: "EMP Name", minWidth: 120 },
//   ];

//   const initialUserData = {
//     EMP_CD: "",
//     EMP_FNM: "",
//     EMP_SNM: "",
//     EMP_MNM: "",
//     EMP_LNM: "",
//     POS_CD: "",
//     DEPT_CD: "",
//     EMAIL: "",
//     EMAIL_PER: "",
//     MOB_NO_01: "",
//     MOB_PER_01: "",
//     MOB_NO_02: "",
//     MOB_PER_02: "",
//     EMP_TP: "",
//     REF_NO: "",
//     STATUS: "",
//     DATE_JOIN: "",
//     DATE_BIRTH: "",
//     GENDER: "",
//     RELIGION: "",
//     ADD_01: "",
//     ADD_STATE: "",
//     ADD_LANDMARK: "",
//     ADD_CITY: "",
//     ADD_PIN: "",
//     PAN_CARD: "",
//     NATION_ID: "",
//     REG_BY: "",
//     REG_DATE: "",
//     UPD_BY: null,
//     UPD_DATE: null,
//   };

//   const [userData, setUserData] = useState(initialUserData);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   //userData as userDataList use because of  clashing

//   const {
//     userData: userDataList,
//     status,
//     error,
//   } = useSelector((state) => state.userCreation);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchUserCreationData());
//     }
//   }, [dispatch, status]);




//   const Save_Click = (event) => {
//     if (event) {
//       event.preventDefault();
//     }
//   alert("dhdhdh")
   
//   };

  


//   const handleUserSelect = (user) => {
//     console.log("Selected employee data:", user);
//     setUserData(user);
//     setSelectedEmployee(user.EMP_CD);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   // // Conditional rendering for loading, error, and data
//   // if (status === "loading") {
//   //   return <p>Loading...</p>;
//   // }

//   if (status === "failed") {
//     return <p>Error: {error}</p>;
//   }

//   const startIndex = (page - 1) * rowsPerPage;
//   const currentData = userDataList.slice(startIndex, startIndex + rowsPerPage);

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         p: 1,
//         // backgroundColor: "#e0e0e0",
//         backgroundColor: "#fafafa",
//       }}
//     >
//       {/* Header with Action Buttons */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           alignItems: "center",
//           p: 1,
//           backgroundColor: "#ffffff",

//           boxShadow: 2,
//           borderRadius: 1,
//           mb: 2,
//           justifyContent: "flex-start",
//           // position: "sticky",
//           // top: "0",
//         }}
//       >
//         <CommonBtn PAGE_CD="GLCMA100200" SAVE_CLICK={Save_Click} />
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 1,
//           borderRadius: 1,
//           p: 1,
//           boxShadow: 2,
//           height: "calc(100vh - 150px)",
//         }}
//       >
//         {/*  User List */}
//         <Box
//           sx={{
//             width: { xs: "100%", md: "250px" },
//             flexShrink: 0,

//             borderRadius: 1,
//             boxShadow: 2,
//             background: "#ffffff",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}
//         >
//           <TableContainer sx={{ height: "90%" }}>
//             <Table stickyHeader aria-label="user table">
//               <TableHead>
//                 <TableRow>
//                   {userColumns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       sx={{
//                         minWidth: column.minWidth,
//                         padding: "4px 18px",
//                         fontWeight: "600",
//                         // background:"#1976d2",
//                         backgroundColor: (theme) => theme.palette.primary.main,
//                         color: "white",
//                         fontSize: "12px",
//                       }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentData.map((user) => (
//                   <TableRow
//                     key={user.EMP_CD}
//                     onClick={() => handleUserSelect(user)}
//                     sx={{
//                       cursor: "pointer",
//                       borderRadius: "50px",
//                       backgroundColor:
//                         selectedEmployee === user.EMP_CD
//                           ? "#e3eefa"
//                           : "inherit",

//                       transition: "background-color 0.3s ease",
//                       "& .MuiTableCell-root": {
//                         padding: "8px 18px",
//                         fontSize: "12px",
//                       },
//                     }}
//                   >
//                     <TableCell>{user.EMP_CD}</TableCell>
//                     <TableCell>{user.EMP_FNM}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginBottom: "5px",
//             }}
//           >
//             <CustomPagination
//               totalItems={userDataList.length}
//               itemsPerPage={rowsPerPage}
//               currentPage={page}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </Box>

//         {/* Main Box */}
//         <Box
//           sx={{
//             flex: 1,
//             backgroundColor: "white",
//             borderRadius: 2,
//             boxShadow: 3,
//             p: 1,
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               height: "40%",
//               width: "100%",
//             }}
//           >
//             {/* Left Section */}
//             <Box
//               sx={{
//                 width: "70%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <Box
//                 component="form"
//                 sx={{
//                   "& .MuiTextField-root": {
//                     m: 0.6,
//                     width: "calc(100% - 10px)",
//                     "& .MuiInputBase-root": {
//                       fontSize: "0.65rem",
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: "0.65rem",
//                     },
//                   },
//                   paddingTop: "5px",
//                   maxHeight: "100%",
//                   overflowY: "auto",
//                   width: "100%%",
//                 }}
//                 noValidate
//                 autoComplete="off"
//               >
//                 <Grid container>
//                   {[
//                     { label: "EMP ID", name: "EMP_CD", value: userData.EMP_CD },
//                     {
//                       label: "MOB NO",
//                       name: "MOB_NO_01",
//                       value: userData.MOB_NO_01,
//                     },
//                     { label: "Name", name: "EMP_FNM", value: userData.EMP_FNM },
//                     {
//                       label: "Landline",
//                       name: "MOB_PER_01",
//                       value: userData.MOB_PER_01,
//                     },
//                     {
//                       label: "Department",
//                       name: "DEPT_CD",
//                       value: userData.DEPT_CD,
//                     },
//                     {
//                       label: "Position",
//                       name: "POS_CD",
//                       value: userData.POS_CD,
//                     },
//                     { label: "Email", name: "EMAIL", value: userData.EMAIL },
//                   ].map((field, index) => (
//                     <Grid item xs={12} sm={6} key={index}>
//                       <TextField
//                         label={field.label}
//                         placeholder={field.label}
//                         name={field.name}
//                         value={field.value}
//                         readOnly={!!selectedEmployee}
//                         size="small"
//                         required
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>
//             </Box>

//             {/* Right Section */}
//             <Box
//               sx={{
//                 width: "30%",
//                 borderRadius: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 maxHeight: "100%",
//                 overflowY: "auto",
                
//               }}
//             >
//               <Box
//                 sx={{
//                   width: "100%",
//                   height: "40%",
//                   display: "flex",
//                   justifyContent: "center",
//                   padding: "5px",
//                 }}
//               >
//                 <img src={ProfilePhoto} alt="" style={{ height: "100%" }} />
//               </Box>
//               <Box
//                 sx={{
//                   width: "100%",
//                   height: "60%",
//                   maxHeight: "60%",
//                   overflowY: "auto",
//                   padding: "5px",
//                 }}
//               >
//                 <Stack spacing={0.5}>
//                   <Button
//                     variant="contained"
//                     sx={{ fontSize: "0.65rem", padding: "3px 10px" }}
//                   >
//                     Password reset
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ fontSize: "0.65rem", padding: "3px 10px" }}
//                     color="error"
//                   >
//                     Block
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ fontSize: "0.65rem", padding: "3px 10px" }}
//                     color="success"
//                   >
//                     Activate
//                   </Button>
//                 </Stack>
//               </Box>
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               width: "calc(100vw - 550px)",
//               maxHeight: "60%",
//               overflowY: "auto",
//               background: "white",
//             }}
//           >


//             <AccessTable EMP_CD={userData.EMP_CD} />





//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default GLCMA100200

