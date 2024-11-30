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
import CustomPagination from "../../../components/CustomPagination";
import { fetchmoduleData, updateModuleData } from "../../../features/commonCodeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const GLCMA100300 = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [module, setModule] = useState("AM");
  const [moduleData, setModuleData] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Extract data and state from Redux
  const { commonModuleData, status, error } = useSelector((state) => state.commonCode);



  console.log(tableData);
  

  const moduleName = [
    { id: "M_DVN", label: "M_DVN", minWidth: 70, readonly: true },
    { id: "C_DVN", label: "C_DVN", minWidth: 70, readonly: true },
    { id: "CODE_NO", label: "CODE_NO", minWidth: 70 },
    { id: "CODE_NM", label: "CODE_NM", minWidth: 70 },
    { id: "CODE_NMH", label: "CODE_NMH", minWidth: 70 },
    { id: "CODE_NMA", label: "CODE_NMA", minWidth: 70 },
    { id: "CODE_NMO", label: "CODE_NMO", minWidth: 70 },
    { id: "SUB_GUN1", label: "SUB_GUN1", minWidth: 70 },
    { id: "SUB_GUN2", label: "SUB_GUN2", minWidth: 70 },
    { id: "SUB_GUN3", label: "SUB_GUN3", minWidth: 70 },
    { id: "SUB_GUN4", label: "SUB_GUN4", minWidth: 70 },
    { id: "SUB_GUN5", label: "SUB_GUN5", minWidth: 70 },
    { id: "SORT_BY", label: "SORT_BY", minWidth: 70 },
    { id: "RMKS", label: "RMKS", minWidth: 70 },
  ];




  useEffect(() => {
    if (selectedModule) {
      dispatch(fetchmoduleData(selectedModule));
    }
  }, [selectedModule, dispatch]);

  useEffect(() => {
    setTableData(commonModuleData || []);
  }, [commonModuleData]);

  useEffect(() => {
    const fectchModuleDate = async () => {
      try {
        const res = await axios.post("/api/GLCMA100300/codeNo", { MODULE_CD: module });
        if (res.status === 200 && Array.isArray(res.data)) {
          setModuleData(res.data)
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setModuleData([]);
      }

    }
    fectchModuleDate()
  }, [module])



  const Save_Click = (event) => {
    if (event) {
      event.preventDefault();
      if (moduleData && moduleData.length > 0) {
        dispatch(updateModuleData(moduleData));
      } else {
        console.error("No data available to update.");
        // Optionally, display an alert to the user
      }
    }
  };


  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    // setSelectedEmployee(user.EMP_CD);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const handleModuleChange = (event) => {
    setModule(event.target.value);
  };


  // // if any changes requare change
  // const handleTableChange = (event, index, field) => {
  //   const newData = [...tableData];
  //   newData[index][field] = event.target.value;
  //   setTableData(newData);
  // };


  const handleTableChange = (event, index, field) => {
    setTableData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, [field]: event.target.value } : row
      )
    );
  };



  const addnewmoduleRow = () => {
    const newRow = {
      M_DVN: selectedModule?.M_DVN || "",
      C_DVN: selectedModule?.C_DVN || "",
      CODE_NO: "",
      CODE_NM: "",
      CODE_NMH: "",
      CODE_NMA: "",
      CODE_NMO: "",
      SUB_GUN1: "",
      SUB_GUN2: "",
      SUB_GUN3: "",
      SUB_GUN4: "",
      SUB_GUN5: "",
      SORT_BY: "",
      RMKS: "",
    };

    setTableData((prevData) => [...prevData, newRow]);
  };



  const startIndex = (page - 1) * rowsPerPage;
  const currentData = moduleData.slice(startIndex, startIndex + rowsPerPage);


  // Styles
  const tableStyles = {
    cell: {
      textAlign: "center",
      padding: "8px 10px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };



  if (status === "failed") {
    return <p>Error: {error}</p>;
  }



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
        }}
      >
        <CommonBtn PAGE_CD="GLCMA100300" SAVE_CLICK={Save_Click} />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="Module-select-label">Module</InputLabel>
          <Select
            labelId="Module-select-label"
            id="Module-select"
            value={module}
            label="Module"
            onChange={handleModuleChange}
          >
            <MenuItem value="AM">AM</MenuItem>
            <MenuItem value="CM">CM</MenuItem>
          </Select>
        </FormControl>

      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "250px 1fr" },
          gap: 1,
          borderRadius: 1,
          p: 1,
          boxShadow: 2,
          height: "calc(100vh - 150px)",
          transition: "transform 0.4s ease, width 0.4s ease",
        }}
      >
        {/* User List */}
        <Box
          sx={{
            borderRadius: 1,
            boxShadow: 2,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >

          <TableContainer sx={{ height: "90%" }}>
            <Table stickyHeader aria-label="user table">
              <TableHead>
                <TableRow>
                  {moduleName.slice(0, 4).map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        minWidth: column.minWidth,
                        padding: "4px 18px",
                        fontWeight: "600",
                        backgroundColor: (theme) =>
                          theme.palette.primary.main,
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((data, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleModuleSelect(data)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: "50px",
                        backgroundColor:
                          selectedModule === data ? "#e3eefa" : "inherit",
                        transition: "background-color 0.3s ease",
                        "& .MuiTableCell-root": {
                          padding: "8px 18px",
                          fontSize: "12px",
                        },
                      }}
                    >
                      <TableCell style={tableStyles.cell}>
                        {data.M_DVN}
                      </TableCell>
                      <TableCell style={tableStyles.cell}>
                        {data.C_DVN}
                      </TableCell>
                      <TableCell style={tableStyles.cell}>
                        {data.CODE_NO}
                      </TableCell>
                      <TableCell style={tableStyles.cell}>
                        {data.CODE_NM}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={moduleName.length}>
                      <span>
                        No data available. Please select a module.
                      </span>


                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "5px",
            }}
          >
            <CustomPagination
              totalItems={moduleData.length}
              itemsPerPage={rowsPerPage}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        </Box>

        {/* Main Box */}
        <Box
          sx={{
            background: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowX: "auto",
            transition: "width 0.4s ease",
            width: "100%",
          }}
        >
          {/* Pink Box with Dropdown and Create Button */}
          <Box
            sx={{
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              p: 1,

            }}
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{
                fontSize: "11px",
                padding: "3px 8px",
              }}
              onClick={addnewmoduleRow}
            >
              Add New Row
            </Button>
          </Box>

          {/* Table in Light Blue Box */}
          <Box
            sx={{
              flex: 1,
              pt: 1,
              maxHeight: "calc(100% - 60px)",
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
                            data[column.id] // Display the value if readonly
                          ) : (
                            <TextField
                              fullWidth
                              value={data[column.id]}
                              // variant="standard"
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
  );
};

export default GLCMA100300;














