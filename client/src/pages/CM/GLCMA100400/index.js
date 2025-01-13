import React, { useEffect, useState } from "react";
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
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import axios from "axios";
import Add from "@mui/icons-material/Add";
import AddMenuModal from "./AddMenuModal";

const GLCMA100400 = () => {
  const [module, setModule] = useState("AM");
  const [moduleData, setModuleData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
    { id: "PAGE_LNK", label: "Page Link", minWidth: 70 },
  ];

  // Fetch module data on mount or when module changes
  useEffect(() => {
    const fectchModuleData = async () => {
      try {
        const res = await axios.post("/api/GLCMA100400/get", {});
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


  // Filter module data based on selected module
  const filteredModuleData = moduleData.filter(
    (data) => data.MODULE_CD === module
  );

  useEffect(() => {
    // Initialize `tableData` only if it hasn't been manually modified
    if (!hasChanges) {
      setTableData(filteredModuleData || []);
    }
  }, [filteredModuleData, hasChanges]);

  const Save_Click = async () => {
    alert("Save button clicked");
    // Add save logic here
    // try{
    //   const res =  await axios.post("/api/GLCMA100400/")

    // }catch(error){
    //   console.log(error);

    // }
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


  const handleModalClose = () => {
    setOpenModal(false); // Close the modal by setting openModal to false
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




      >-
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
                      maxHeight: 200, // Optional: Adjust menu height if needed
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
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tableData.map((data, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {moduleName.map((column, colIndex) => (
                          <TableCell key={colIndex} style={tableStyles.cell}>
                            {column.readonly ? (
                              data[column.id]
                            ) : (
                              <TextField
                                fullWidth
                                value={data[column.id]}
                                onChange={(event) =>
                                  handleTableChange(event, rowIndex, column.id)
                                }
                                size="small"
                                sx={{
                                  "& .MuiInputBase-input": {
                                    fontSize: "11px",
                                    padding: "2px 5px",
                                  },
                                }}
                              />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}


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
  },
};



export default GLCMA100400;













