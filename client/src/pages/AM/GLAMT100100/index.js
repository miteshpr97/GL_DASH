import React, { useState, useRef } from "react";
import { Box, Tabs, Tab, CircularProgress, Collapse, Chip } from "@mui/material";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import DataTable from "../../../components/DataTable";
import RegTrans from "./RegTrans";
import axios from "axios";
import ActionMenu from "../../../components/ActionMenu";
import { fetchTransData } from "../../../features/tranSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { field: "REF_TNO", headerName: "Transaction No", width: 150 },
  { field: "REF_TYPE", headerName: "Reference Type", width: 150 },
  { field: "REF_NO", headerName: "Reference No", width: 200 },
  { field: "REF_DESC", headerName: "Description", width: 250 },
  { field: "LAMT", headerName: "Amount", width: 150 },
  { field: "DOC_DTE", headerName: "Document Date", width: 150 },
  { field: "POST_DTE", headerName: "Posting Date", width: 150 },
  { field: "DOC_STATUS", headerName: "Status", width: 100 },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => (
      <ActionMenu
        rowData={params.row}
        onEdit={() => console.log("Edit", params.row)}
        onRename={() => console.log("Rename", params.row)}
        onDelete={() => console.log("Delete", params.row)}
      />
    ),
  },
];


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

  const dispatch = useDispatch();
  const inputRef = useRef(null);
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

  const {
    TransData,
    status,
    error,
  } = useSelector((state) => state.TransCreation);


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
      await dispatch(fetchTransData())
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error during save:", error);
      alert(error.response?.data?.message || "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  const Inqury_Click = async (event) => {
    event.preventDefault(); 
    inputRef.current.focus();
  };


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransData());
    }
  }, [dispatch, status]);



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
          <CommonBtn PAGE_CD="GLAMT100100" SAVE_CLICK={Save_Click} INQUERY_CLICK={Inqury_Click} />
        </Box>
        {loading && <CircularProgress size={24} />}
      </Box>

      {/* Tabs */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
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
        <Box sx={{
           "& .css-19kzrtu": {
            padding: "10px", 
          },

        }}> 
        <TabPanel value={value} index={0}>
          <DataTable
            rows={TransData?.length > 0 ? TransData : []}
            columns={columns}
            inputRef={inputRef}
            onEdit={(row) => console.log("Edit", row)}
            onRename={(row) => console.log("Rename", row)}
            onDelete={(row) => console.log("Delete", row)}
          />
        </TabPanel>
        <TabPanel value={value} index={1} sx={{ backgroundColor: "blue" }}>
          <RegTrans regisData={regisData} handleChange={handleChange} />
        </TabPanel>
        </Box>
      </Box>
    </Box>

  );
};

export default GLAMT100100;




















// const columns = [
//   { field: "invoice", headerName: "Invoice", width: 120 },
//   { field: "date", headerName: "Date", width: 120 },
//   {
//     field: "status",
//     headerName: "Status",
//     width: 130,
//     renderCell: (params) => (
//       <Chip
//         label={params.value}
//         color={
//           params.value === "Paid"
//             ? "success"
//             : params.value === "Cancelled"
//             ? "error"
//             : "default"
//         }
//       />
//     ),
//   },
//   { field: "customer", headerName: "Customer", width: 120 },
//   { field: "email", headerName: "Email", width: 120 },
//   {
//     field: "action",
//     headerName: "Action",
//     width: 100,
//     renderCell: (params) => (
//       <ActionMenu
//         rowData={params.row}
//         onEdit={() => console.log("Edit", params.row)}
//         onRename={() => console.log("Rename", params.row)}
//         onDelete={() => console.log("Delete", params.row)}
//       />
//     ),
//   },
// ];





