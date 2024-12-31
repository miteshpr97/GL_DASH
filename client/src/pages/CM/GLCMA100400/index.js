import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import {
  fetchmoduleData,
  updateModuleData,
} from "../../../features/commonCodeSlice";
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

  console.log(commonModuleData, "data is the data");

  const moduleName = [
    { id: "M_DVN", label: "Module Code", minWidth: 70, readonly: true },
    { id: "C_DVN", label: "Module Name", minWidth: 70, readonly: true },
    { id: "CODE_NO", label: "Menu Code", minWidth: 70 },
    { id: "CODE_NM", label: "Menu Name", minWidth: 70 },
    { id: "CODE_NMH", label: "Page Code", minWidth: 70 },
    { id: "CODE_NMA", label: "Page Name", minWidth: 70 },
    { id: "CODE_NMO", label: "Page ID", minWidth: 70 },
    { id: "SUB_GUN1", label: "R Status", minWidth: 70 },
    { id: "SUB_GUN2", label: "Icon Page", minWidth: 70 },
    { id: "SUB_GUN3", label: "Icon Module", minWidth: 70 },
    { id: "SUB_GUN4", label: "Icon Menu", minWidth: 70 },
    { id: "SUB_GUN5", label: "Page Link", minWidth: 70 },
  ];


  useEffect(() => {
    if (selectedModule) {
      dispatch(fetchmoduleData(selectedModule));
    }
  }, [selectedModule, dispatch]);

  useEffect(() => {
    setTableData(commonModuleData || []);
  }, [commonModuleData]);

  // module base data fetch from select
  useEffect(() => {
    const fectchModuleData = async () => {
      try {
        const res = await axios.post("/api/GLCMA100300/codeNo", {
          MODULE_CD: module,
        });
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

  const Save_Click = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!hasChanges) {
      alert("No changes detected. Please make changes before saving.");
      return;
    }
    try {
      await dispatch(updateModuleData(tableData));
      if (selectedModule) {
        await dispatch(fetchmoduleData(selectedModule));
      }
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
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
      M_DVN: commonModuleData[0]?.M_DVN || "",
      C_DVN: commonModuleData[0]?.C_DVN || "",
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
        <CommonBtn PAGE_CD="GLCMA100300" SAVE_CLICK={Save_Click} />

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
            disabled={!selectedModule}
          >
            <Add style={{ color: "#f7bd1d" , fontSize:"16px" }} />
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

export default GLCMA100400;






