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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Add from "@mui/icons-material/Add";

const GLCMA100400 = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [module, setModule] = useState("AM");
  const [moduleData, setModuleData] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Extract data and state from Redux
  const { commonModuleData, status, error } = useSelector(
    (state) => state.commonCode
  );

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


  useEffect(() => {
    setTableData(commonModuleData || []);
  }, [commonModuleData]);

  // module base data fetch from select
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
  }, []);

  const Save_Click = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!hasChanges) {
      alert("No changes detected. Please make changes before saving.");
      return;
    }
    try {
   
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

  const addnewmoduleRow = () => {
    const newRow = {
      MODULE_CD: commonModuleData[0]?.MODULE_CD || "",
      MODULE_NM: commonModuleData[0]?.MODULE_NM || "", 
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
    };
  
    setTableData((prevData) => [...prevData, newRow]);
    setHasChanges(true);
  };
  

  const startIndex = (page - 1) * rowsPerPage;

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

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  // Filter moduleData based on selected module
  const filteredModuleData = moduleData.filter(
    (data) => data.MODULE_CD === module
  );

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
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{
              fontSize: "12px",
              padding: "3px 8px",
              marginRight: "10px",
            }}
            onClick={addnewmoduleRow}
        
          >
            <Add style={{ color: "#f7bd1d" , fontSize:"16px" }} />
            New Row
          </Button>

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
            pt:0.5,
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
                  {filteredModuleData.map((data, rowIndex) => (
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

                  {/* Add New Row */}
                  {tableData.map((newRow, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {moduleName.map((column, colIndex) => (
                        <TableCell key={colIndex} style={tableStyles.cell}>
                          <TextField
                            fullWidth
                            value={newRow[column.id]}
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
  );
};

export default GLCMA100400;
