// src/DataTable.js
import * as React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,

  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

// // Reusable ActionMenu component
// function ActionMenu({ rowData, onEdit, onRename, onDelete }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box>
//       <IconButton size="small" onClick={handleClick}>
//         <MoreHorizRoundedIcon />
//       </IconButton>
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem onClick={() => { onEdit(rowData); handleClose(); }}>Edit</MenuItem>
//         <MenuItem onClick={() => { onRename(rowData); handleClose(); }}>Rename</MenuItem>
//         <MenuItem onClick={handleClose}>Move</MenuItem>
//         <Divider />
//         <MenuItem onClick={() => { onDelete(rowData); handleClose(); }} style={{ color: "red" }}>
//           Delete
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// }


// Reusable DataTable component
export default function DataTable({ rows: initialRows, columns, onEdit, onRename, onDelete }) {
  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const handleSearch = debounce((value) => {
    setRows(
      initialRows.filter(
        (row) =>
          row.invoice.toLowerCase().includes(value.toLowerCase()) ||
          row.customer.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, 300);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    handleSearch(event.target.value);
  };

  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    setRows(initialRows.filter((row) => !value || row.status === value));
  };

  const handleClearFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setRows(initialRows);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <TextField
          label="Search for order"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
          size="small"
        />
        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value="">Filter by status</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Refunded">Refunded</MenuItem>
        </Select>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            color: "#374151", 
            backgroundColor: "white",
            borderColor: "#CBD5E1", 
            "&:hover": {
              borderColor: "#1D4ED8", 
              backgroundColor: "#E0F2FE", 
              color: "#1D4ED8", 
            },
            padding: "6px 12px",
            borderRadius: "8px",
            fontWeight: "500", 
            fontSize: "14px",
            transition: "all 0.3s ease",
          }}
        >
          Clear Filters
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            color: "black",
            fontSize: "14px",
          },
          width: "100%", // Ensures DataGrid takes full width
        }}
      />
    </Box>
  );
}





























import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress, Collapse, Chip } from "@mui/material";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import DataTable from "../../../components/DataTable";
import RegTrans from "./RegTrans";
import ActionMenu from "../../../components/ActionMenu"

import axios from "axios";






// const columns = [
//   { field: "invoice", headerName: "Invoice", width: 150 },
//   { field: "date", headerName: "Date", width: 150 },
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
//               ? "error"
//               : "default"
//         }
//       />
//     ),
//   },
//   { field: "customer", headerName: "Customer", width: 200 },
//   { field: "email", headerName: "Email", width: 250 },
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


const columns =[
  { field: "invoice", headerName: "Invoice", width: 150 },
  { field: "invoice", headerName: "Invoice", width: 150 },
  { field: "invoice", headerName: "Invoice", width: 150 },
  { field: "invoice", headerName: "Invoice", width: 150 },
  { field: "invoice", headerName: "Invoice", width: 150 },
  { field: "invoice", headerName: "Invoice", width: 150 },



]

const rows = [
  {
    id: 1,
    invoice: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: "Anjali Sharma",
    email: "anjali.sharma@email.com",
  },
  // Additional rows...
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

  const [tranData, setTranData] = useState([]);

  console.log(tranData, "this data");

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


  useEffect(() => {
    const fetchTrans = async () => {
      try {
        const res = await axios.post('api/GLAMT100100/details');
        setTranData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);

      }
    };
    fetchTrans();
  }, []);


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
          <DataTable
            rows={rows}
            columns={columns}
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

  );
};

export default GLAMT100100;

