// import React, { useState } from 'react'
// import { Box, Button, Tabs, Tab, } from "@mui/material";
// import CommonBtn from "../../../components/CustomBtn/CommonBtn";
// import DataTable from "../../../components/DataTable";
// import RegTrans from './RegTrans';
// import axios from 'axios';


// function TabPanel({ children, value, index }) {
//   return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
// }

// const getCurrentYearMonth = () => {
//   const now = new Date();
//   return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
// };

// const GLAMT100100 = () => {

//   const [value, setValue] = useState(0);
//   const handleTabChange = (event, newValue) => {
//     setValue(newValue);
//   };


//   const [regisData, setRegisData] = useState({
//     REG_DATE: new Date().toISOString().split("T")[0], // Default to today's date
//     REF_TNO: "AUTO_GENERATED",
//     YEAR_CD: getCurrentYearMonth(),
//     POST_DTE: "",
//     DOC_DTE: "",
//     REF_TYPE: "",
//     REF_NO: "",
//     REF_DESC: "",
//     RMKS: "",
//     LCURR_CD: "",
//     LAMT: "",
//     FCURR_CD: "",
//     FAMT: "",
//     EXCHANGE_RATE: "",
//     REG_BY: "",
//     DOC_STATUS: "",
//   })


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRegisData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   const Save_Click = async (event) => {
//     if (event) {
//       event.preventDefault();
//     }
//     try {
//       const res = await axios.post('/api/GLAMT100100', regisData);
//       console.log('Response:', res.data);
//       alert('Data saved successfully!');

//     } catch (error) {
//       console.error('Error during save:', error);
//       alert('Failed to save data. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100vh",
//           p: 1,
//           backgroundColor: "#fafafa",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Header with Action Buttons */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             alignItems: "center",
//             p: 1,
//             backgroundColor: "#ffffff",
//             boxShadow: 2,
//             borderRadius: 1,
//             mb: 2,
//             justifyContent: "space-between", 
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 7 }}>
//             <CommonBtn PAGE_CD="GLAMT100100" SAVE_CLICK={Save_Click} />
//           </Box>


//         </Box>


//         <Box sx={{ width: '100%' }}>
//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs value={value} onChange={handleTabChange}>
//               <Tab label="Transaction" />
//               <Tab label="Add Transaction" />
//             </Tabs>
//           </Box>
//           <TabPanel value={value} index={0} >
//             <DataTable />
//           </TabPanel>
//           <TabPanel value={value} index={1}>
//             <RegTrans
//               regisData={regisData}
//               handleChange={handleChange}

//               />
//           </TabPanel>

//         </Box>


//       </Box>


//     </>



//   );
// };

// export default GLAMT100100;



















import React, { useState } from "react";
import { Box, Tabs, Tab, Fade, CircularProgress, Slide, Collapse, Grow } from "@mui/material";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import DataTable from "../../../components/DataTable";
import RegTrans from "./RegTrans";
import axios from "axios";

function TabPanel({ children, value, index }) {
  return (
    <Collapse in={value === index} timeout={500}>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Collapse>
  );
}


// function TabPanel({ children, value, index }) {
//   return value === index && <Box sx={{ p: 3 }}>{children}</Box>;
// }


const GLAMT100100 = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [regisData, setRegisData] = useState({
    REG_DATE: new Date().toISOString().split("T")[0],
    REF_TNO: null,
    YEAR_CD: "",
    POST_DTE: "",
    DOC_DTE: "",
    REF_TYPE: "",
    REF_NO: "",
    REF_DESC: "",
    RMKS: "",
    LCURR_CD: "",
    LAMT: "",
    FCURR_CD: "",
    FAMT: "",
    EXCHANGE_RATE: "",
    REG_BY: "",
    DOC_STATUS: ""
  });


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Save_Click = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/GLAMT100100", regisData);
      console.log("Response:", res.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error during save:", error);
      alert(error.response?.data?.message || "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <Box
      sx={{
        width: "100%",
        height: "100vh",
        p: 1,
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          p: 1,
          backgroundColor: "#ffffff",
          boxShadow: 2,
          borderRadius: 1,
          mb: 2,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ flex: 7 }}>
          <CommonBtn PAGE_CD="GLAMT100100" SAVE_CLICK={Save_Click} />
        </Box>
        {loading && <CircularProgress size={24} />}
      </Box>

      {/* Tabs */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab
              label="Transaction"
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
            <Tab
              label="Add Transaction"
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <DataTable />
        </TabPanel>
        <TabPanel value={value} index={1} sx={{ backgroundColor: "blue" }}>
          <RegTrans regisData={regisData} handleChange={handleChange} />
        </TabPanel>



      </Box>
    </Box>

  );
};

export default GLAMT100100;

