import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import axios from "axios";
import Add from "@mui/icons-material/Add";

import { createNewMenu } from "../../../features/createMenuSlice";
import AddMenuModal from "./AddMenuModal";
import { useDispatch, useSelector } from "react-redux";
// import { setBtnPermission } from "../../../features/userAccessSlice";

const GLCMA100400 = () => {
  const dispatch = useDispatch();
  const [module, setModule] = useState("AM");
  const [moduleData, setModuleData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = React.useState("add");
  const [newRowData, setNewRowData] = useState({
    MODULE_CD: "",
    MODULE_NM: "",
    MENU_CD: "",
    MENU_NM: "",
    PAGE_CD: "",
    PAGE_NM: "",
    PAGE_ID: "",
    RSTATUS: "",
    ICON_PAGE: "",
    ICON_MODULE: "",
    ICON_MENU: "",
    PAGE_LNK: "",
  });

  // const { btnPermission } = useSelector(state => state.userAccess);
  // console.log('btnPermission:', btnPermission);



  const moduleName = [
    { id: "MODULE_CD", label: "Module Code", minWidth: 70, readonly: true },
    { id: "MODULE_NM", label: "Module Name", minWidth: 70, readonly: true },
    { id: "MENU_CD", label: "Menu Code", minWidth: 70 },
    { id: "MENU_NM", label: "Menu Name", minWidth: 70 },
    { id: "PAGE_CD", label: "Page Code", minWidth: 70 },
    { id: "PAGE_NM", label: "Page Name", minWidth: 70 },
    { id: "PAGE_ID", label: "Page ID", minWidth: 70 },
    { id: "RSTATUS", label: "R Status", minWidth: 70 },
    { id: "ICON_PAGE", label: "Icon Page", minWidth: 70 },
    { id: "ICON_MODULE", label: "Icon Module", minWidth: 70 },
    { id: "ICON_MENU", label: "Icon Menu", minWidth: 70 },
    { id: "PAGE_LNK", label: "Page Link", minWidth: 70 }

  ];



  // useEffect(()=>{
  //   dispatch(setBtnPermission())
  // })

  useEffect(() => {
    const fectchModuleData = async () => {
      try {
        const res = await axios.post("/api/GLCMA100400/get");
        if (res.status === 200 && Array.isArray(res.data)) {
          setModuleData(res.data);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setModuleData([]);
      }
    };
    fectchModuleData();
  }, [module]);

  const filteredModuleData = useMemo(() => {
    return moduleData.filter((data) => data.MODULE_CD === module);
  }, [module, moduleData]);

  useEffect(() => {
    // Initialize `tableData` only if it hasn't been manually modified
    if (!hasChanges) {
      setTableData(filteredModuleData || []);
    }
  }, [filteredModuleData, hasChanges]);

  const Save_Click = async () => {
    const requiredFields = [
      "MENU_CD",
      "MENU_NM",
      "PAGE_CD",
      "PAGE_NM",
      "PAGE_ID",
      "RSTATUS",
      "PAGE_LNK",
    ];

    // Check if all required fields are filled
    const isValid = requiredFields.every((field) => newRowData[field]?.trim() !== "");

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(createNewMenu(newRowData));
      setTableData((prevData) => {
        const rowIndex = prevData.findIndex(
          (row) => row.PAGE_ID === newRowData.PAGE_ID
        );
        if (rowIndex > -1) {
          // If the row exists, update it
          const updatedData = [...prevData];
          updatedData[rowIndex] = newRowData;
          return updatedData;
        } else {
          // If the row doesn't exist, add it as a new row
          return [...prevData, newRowData];
        }
      });

      setOpenModal(false);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };


  const handleModuleChange = (event) => {
    setModule(event.target.value);
  };

  const handleTableChange = (event, index, field) => {
    setTableData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, [field]: event.target.value } : row
      )
    );
    setHasChanges(true);
  };

  const handleModalOpen = () => {
    setMode("add");
    setNewRowData({
      MODULE_CD: filteredModuleData[0]?.MODULE_CD || "",
      MODULE_NM: filteredModuleData[0]?.MODULE_NM || "",
      MENU_CD: "",
      MENU_NM: "",
      PAGE_CD: "",
      PAGE_NM: "",
      PAGE_ID: "",
      RSTATUS: "",
      ICON_PAGE: "",
      ICON_MODULE: "",
      ICON_MENU: "",
      PAGE_LNK: "",
    });

    setOpenModal(true);
  };

  const handleEditModal = (rowData) => {
    setMode("update");
    setNewRowData(rowData);
    setOpenModal(true);

  }

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleNewRowChange = (event) => {
    const { name, value } = event.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <AddMenuModal
        openModal={openModal}
        handleClose={handleModalClose}
        handleAdd={Save_Click}
        moduleName={moduleName}
        handleNewRowChange={handleNewRowChange}
        newRowData={newRowData}
        mode={mode}
      />

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
            flexWrap: "wrap",
          }}
        >
          <CommonBtn PAGE_CD="GLCMA100400" SAVE_CLICK={Save_Click} />

          <Box
            sx={{
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="Module-select-label">Module</InputLabel>
              <Select
                labelId="Module-select-label"
                id="Module-select"
                value={module}
                label="Module"
                onChange={handleModuleChange}
                sx={{
                  height: "30px",
                  fontSize: "11px",
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                <MenuItem value="AM" sx={{ fontSize: "11px", height: "30px" }}>
                  AM
                </MenuItem>
                <MenuItem value="CM" sx={{ fontSize: "11px", height: "30px" }}>
                  CM
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{
                fontSize: "12px",
                padding: "3px 8px",
                marginLeft: "5px",
              }}
              onClick={handleModalOpen}
            >
              <Add style={{ color: "#f7bd1d", fontSize: "16px" }} />
              New Row
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: " 1fr" },
            gap: 1,
            borderRadius: 1,
            p: 1,
            boxShadow: 2,
            height: "calc(100vh - 150px)",
            transition: "transform 0.4s ease, width 0.4s ease",
          }}
        >
          {/* Main Box */}
          <Box
            sx={{
              background: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: 1,
              pt: 0.5,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflowX: "auto",
              transition: "width 0.4s ease",
              width: "100%",
            }}
          >
            <Box
              sx={{
                flex: 1,
                maxHeight: "100%",
                overflowX: "auto",
              }}
            >
              <TableContainer sx={{ minHeight: "100%" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {moduleName.length > 0 &&
                        moduleName.map((column, idx) => (
                          <TableCell
                            key={idx}
                            sx={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              background: "#4c5bb5",
                              color: "#fff",
                              padding: "4px 8px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {column.label}

                          </TableCell>

                        ))}

                      <TableCell
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: "#4c5bb5",
                          color: "#fff",
                          padding: "4px 8px",
                          whiteSpace: "nowrap",
                        }}
                      >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(Array.isArray(tableData) ? tableData : []).map(
                      (data, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {moduleName.map((column, colIndex) => (
                            <TableCell key={colIndex} style={tableStyles.cell}>
                              {column.readonly ? (
                                data[column.id]
                              ) : (
                                <TextField
                                  fullWidth
                                  value={data[column.id] || ""}
                                  onChange={(event) =>
                                    handleTableChange(
                                      event,
                                      rowIndex,
                                      column.id
                                    )
                                  }
                                  size="small"
                                  InputProps={{
                                    readOnly: true, // This makes the field readonly without disabling it
                                  }}
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      fontSize: "11px",
                                      padding: "2px 5px",
                                    },
                                    fontSize: "9px"
                                  }}
                                />
                              )}
                            </TableCell>
                          ))}
                          {/* Add an extra column for the Update button */}
                          <TableCell style={tableStyles.cell}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleEditModal(data)}
                              sx={{
                                fontSize: "12px",
                                padding: "3px 8px",
                                minWidth: "40px", // Ensures button width is consistent
                              }}
                            >
                              <EditIcon
                                style={{ color: "#ffffff", fontSize: "16px" }}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

// Styles
const tableStyles = {
  cell: {
    textAlign: "center",
    padding: "8px 5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "11px"
  },
};

export default GLCMA100400;



