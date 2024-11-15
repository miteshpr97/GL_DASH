// import React, { createContext, useState, useContext } from "react";

// // Create a context for the sidebar state
// const SidebarContext = createContext();

// // Sidebar provider component
// export const SidebarProvider = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const openSidebar = () => {
//     setIsSidebarOpen(true);
//     if (typeof document !== "undefined") {
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
//     }
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//     if (typeof document !== "undefined") {
//       document.documentElement.style.removeProperty("--SideNavigation-slideIn");
//       document.body.style.removeProperty("overflow");
//     }
//   };

//   const toggleSidebar = () => {
//     if (isSidebarOpen) {
//       closeSidebar();
//     } else {
//       openSidebar();
//     }
//   };

//   return (
//     <SidebarContext.Provider
//       value={{ isSidebarOpen, openSidebar, closeSidebar, toggleSidebar }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// // Custom hook to use sidebar context
// export const useSidebar = () => useContext(SidebarContext);
// SidebarContext.js



import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
