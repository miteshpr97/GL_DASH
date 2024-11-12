import * as React from "react";

import { AppBar, Box } from "@mui/material";
import ColorSchemeToggle from "../components/ColorSchemeToggle";
import ToggleButton from "./ToggleButton";

export default function Header({ onToggleTheme, mode }) {
  return (
    <AppBar
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: {
          xs: "100%",
          sm: "calc(100% - var(--Sidebar-width, 220px))",
         
        },
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

        <ToggleButton/>
        

        <ColorSchemeToggle onClick={onToggleTheme} mode={mode} />

      
      </Box>
    </AppBar>
  );
}













// import React from 'react';
// import { AppBar, Box, IconButton } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu'; // Use Material UI's Menu icon

// export default function Header({ toggleSidebar }) {
//   return (
//     <AppBar
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         position: "fixed",
//         top: 0,
//         width: {
//           xs: "100%",
//           sm: "calc(100% - var(--Sidebar-width, 220px))",
//         },
//         height: "var(--Header-height)",
//         zIndex: 9998,
//         padding: "4px 16px",
//         gap: 1,
//         borderBottom: "1px solid",
//         borderColor: "background.level1",
//         boxShadow: "none",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Add a button or icon to toggle the sidebar */}
//         <IconButton color="inherit" onClick={toggleSidebar}>
//           <MenuIcon />
//         </IconButton>
//       </Box>
//     </AppBar>
//   );
// }
