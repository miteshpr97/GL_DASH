// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import CommonBtn from "../../../components/CustomBtn/CommonBtn";
// import CustomPagination from "../../../components/CustomPagination";
// import {
//   fetchmoduleData,
//   updateModuleData,
// } from "../../../features/commonCodeSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Add from "@mui/icons-material/Add";

// const GLCMA100300 = () => {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [module, setModule] = useState("AM");
//   const [moduleData, setModuleData] = useState([]);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const [hasChanges, setHasChanges] = useState(false);


//   // Extract data and state from Redux
//   const { commonModuleData, status, error } = useSelector(
//     (state) => state.commonCode
//   );


//   console.log(tableData);


//   console.log(commonModuleData, "data is the data");

//   const moduleName = [
//     { id: "M_DVN", label: "M_DVN", minWidth: 70, readonly: true },
//     { id: "C_DVN", label: "C_DVN", minWidth: 70, readonly: true },
//     { id: "CODE_NO", label: "CODE_NO", minWidth: 70 },
//     { id: "CODE_NM", label: "CODE_NM", minWidth: 70 },
//     { id: "CODE_NMH", label: "CODE_NMH", minWidth: 70 },
//     { id: "CODE_NMA", label: "CODE_NMA", minWidth: 70 },
//     { id: "CODE_NMO", label: "CODE_NMO", minWidth: 70 },
//     { id: "SUB_GUN1", label: "SUB_GUN1", minWidth: 70 },
//     { id: "SUB_GUN2", label: "SUB_GUN2", minWidth: 70 },
//     { id: "SUB_GUN3", label: "SUB_GUN3", minWidth: 70 },
//     { id: "SUB_GUN4", label: "SUB_GUN4", minWidth: 70 },
//     { id: "SUB_GUN5", label: "SUB_GUN5", minWidth: 70 },
//     { id: "SORT_BY", label: "SORT_BY", minWidth: 70 },
//     { id: "RMKS", label: "RMKS", minWidth: 70 },
//   ];

//   useEffect(() => {
//     if (selectedModule) {
//       dispatch(fetchmoduleData(selectedModule));
//     }
//   }, [selectedModule, dispatch]);

//   useEffect(() => {
//     setTableData(commonModuleData || []);
//   }, [commonModuleData]);

//   // module base data fetch from select
//   useEffect(() => {
//     const fectchModuleData = async () => {
//       try {
//         const res = await axios.post("/api/GLCMA100300/codeNo", {
//           MODULE_CD: module,
//         });
//         if (res.status === 200 && Array.isArray(res.data)) {
//           setModuleData(res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//         setModuleData([]);
//       }
//     };
//     fectchModuleData();
//   }, [module]);

//   const Save_Click = async (event) => {
//     if (event) {
//       event.preventDefault();
//     }

//     if (!hasChanges) {
//       alert("No changes detected. Please make changes before saving.");
//       return;
//     }
//     try {
//       await dispatch(updateModuleData(tableData));
//       if (selectedModule) {
//         await dispatch(fetchmoduleData(selectedModule));
//       }
//       alert("Data saved successfully!");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Failed to save data. Please try again.");
//     }
//   };

//   //select M_dvn and code_no
//   const handleModuleSelect = (module) => {
//     setSelectedModule(module);
//     // setSelectedEmployee(user.EMP_CD);
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   // module base data fetch from select
//   const handleModuleChange = (event) => {
//     setModule(event.target.value);
//   };

//   const handleTableChange = (event, index, field) => {
//     setTableData((prevData) =>
//       prevData.map((row, i) =>
//         i === index ? { ...row, [field]: event.target.value } : row
//       )
//     );
//     setHasChanges(true);
//   };

//   const addnewmoduleRow = () => {
//     const newRow = {
//       M_DVN: commonModuleData[0]?.M_DVN || "",
//       C_DVN: commonModuleData[0]?.C_DVN || "",
//       CODE_NO: "",
//       CODE_NM: "",
//       CODE_NMH: "",
//       CODE_NMA: "",
//       CODE_NMO: "",
//       SUB_GUN1: "",
//       SUB_GUN2: "",
//       SUB_GUN3: "",
//       SUB_GUN4: "",
//       SUB_GUN5: "",
//       SORT_BY: "",
//       RMKS: "",
//     };

//     setTableData((prevData) => [...prevData, newRow]);
//   };

//   const startIndex = (page - 1) * rowsPerPage;
//   const currentData = moduleData.slice(startIndex, startIndex + rowsPerPage);

//   // Styles
//   const tableStyles = {
//     cell: {
//       textAlign: "center",
//       padding: "8px 5px",
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//     },
//   };

//   if (status === "failed") {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         p: 1,
//         backgroundColor: "#fafafa",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header with Action Buttons */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           alignItems: "center",
//           p: 1,
//           backgroundColor: "#ffffff",
//           boxShadow: 2,
//           borderRadius: 1,
//           mb: 2,
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//         }}
//       >
//         <CommonBtn PAGE_CD="GLCMA100300" SAVE_CLICK={Save_Click} />

//         <Box
//           sx={{
//             height: "30px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             p: 1,
//           }}
//         >


//           <FormControl size="small" sx={{ minWidth: 200 }}>
//             <InputLabel id="Module-select-label">Module</InputLabel>
//             <Select
//               labelId="Module-select-label"
//               id="Module-select"
//               value={module}
//               label="Module"
//               onChange={handleModuleChange}
//               sx={{
//                 height: "30px",
//                 fontSize: "11px",
//               }}
//               MenuProps={{
//                 PaperProps: {
//                   sx: {
//                     maxHeight: 200, // Optional: Adjust menu height if needed
//                   },
//                 },
//               }}
//             >
//               <MenuItem value="AM" sx={{ fontSize: "11px", height: "30px" }}>
//                 AM
//               </MenuItem>
//               <MenuItem value="CM" sx={{ fontSize: "11px", height: "30px" }}>
//                 CM
//               </MenuItem>
//             </Select>
//           </FormControl>



//           <Button
//             variant="contained"
//             size="small"
//             color="primary"
//             sx={{
//               fontSize: "12px",
//               padding: "3px 8px",
//               marginLeft: "5px",
//             }}
//             onClick={addnewmoduleRow}
//             disabled={!selectedModule}
//           >
//             <Add style={{ color: "#f7bd1d" , fontSize:"16px" }} />
//              New Row
//           </Button>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", md: "250px 1fr" },
//           gap: 1,
//           borderRadius: 1,
//           p: 1,
//           boxShadow: 2,
//           height: "calc(100vh - 150px)",
//           transition: "transform 0.4s ease, width 0.4s ease",
//         }}
//       >
//         {/* User List */}
//         <Box
//           sx={{
//             borderRadius: 1,
//             boxShadow: 2,
//             background: "#ffffff",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <TableContainer sx={{ height: "93%" }}>
//             <Table stickyHeader aria-label="user table">
//               <TableHead>
//                 <TableRow>
//                   {moduleName.slice(0, 4).map((column) => (
//                     <TableCell
//                       key={column.id}
//                       sx={{
//                         minWidth: column.minWidth,
//                         padding: "4px 18px",
//                         fontWeight: "600",
//                         backgroundColor: (theme) => theme.palette.primary.main,
//                         color: "white",
//                         fontSize: "12px",
//                       }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentData.length > 0 ? (
//                   currentData.map((data, index) => (
//                     <TableRow
//                       key={index}
//                       onClick={() => handleModuleSelect(data)}
//                       sx={{
//                         cursor: "pointer",
//                         borderRadius: "50px",
//                         backgroundColor:
//                           selectedModule === data ? "#e3eefa" : "inherit",
//                         transition: "background-color 0.3s ease",
//                         "& .MuiTableCell-root": {
//                           padding: "8px 18px",
//                           fontSize: "12px",
//                         },
//                       }}
//                     >
//                       <TableCell style={tableStyles.cell}>
//                         {data.M_DVN}
//                       </TableCell>
//                       <TableCell style={tableStyles.cell}>
//                         {data.C_DVN}
//                       </TableCell>
//                       <TableCell style={tableStyles.cell}>
//                         {data.CODE_NO}
//                       </TableCell>
//                       <TableCell style={tableStyles.cell}>
//                         {data.CODE_NM}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={moduleName.length}>
//                       <span>No data available. Please select a module.</span>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginBottom: "5px",
//             }}
//           >
//             <CustomPagination
//               totalItems={moduleData.length}
//               itemsPerPage={rowsPerPage}
//               currentPage={page}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </Box>

//         {/* Main Box */}
//         <Box
//           sx={{
//             background: "white",
//             borderRadius: 2,
//             boxShadow: 3,
//             p: 1,
//             pt:0.5,
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//             overflowX: "auto",
//             transition: "width 0.4s ease",
//             width: "100%",
//           }}
//         >
//           <Box
//             sx={{
//               flex: 1,
//               maxHeight: "100%",
//               overflowX: "auto",
//             }}
//           >
//             <TableContainer sx={{ minHeight: "100%" }}>
//               <Table stickyHeader aria-label="sticky table">
//                 <TableHead>
//                   <TableRow>
//                     {moduleName.length > 0 &&
//                       moduleName.map((column, idx) => (
//                         <TableCell
//                           key={idx}
//                           sx={{
//                             fontSize: "12px",
//                             fontWeight: "bold",
//                             background: "#4c5bb5",
//                             color: "#fff",
//                             padding: "4px 8px",
//                           }}
//                         >
//                           {column.label}
//                         </TableCell>
//                       ))}
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {tableData.map((data, rowIndex) => (
//                     <TableRow key={rowIndex}>
//                       {moduleName.map((column, colIndex) => (
//                         <TableCell key={colIndex} style={tableStyles.cell}>
//                           {column.readonly ? (
//                             data[column.id]
//                           ) : (
//                             <TextField
//                               fullWidth
//                               value={data[column.id]}
//                               // variant="standard"
//                               onChange={(event) =>
//                                 handleTableChange(event, rowIndex, column.id)
//                               }
//                               size="small"
//                               sx={{
//                                 "& .MuiInputBase-input": {
//                                   fontSize: "11px",
//                                   padding: "2px 5px",

//                                 },                           
//                               }}
//                             />
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default GLCMA100300;



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
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import CustomPagination from "../../../components/CustomPagination";
import {
  fetchmoduleData,
  updateModuleData,
} from "../../../features/commonCodeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Add from "@mui/icons-material/Add";
import AddCommonCode from "./AddCommonCode";
import EditIcon from "@mui/icons-material/Edit";


const GLCMA100300 = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [module, setModule] = useState("AM");
  const [moduleData, setModuleData] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = React.useState("add");
  const [hasChanges, setHasChanges] = useState(false);
  const [newRowData, setNewRowData] = useState({
    M_DVN: "",
    C_DVN: "",
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
    RMKS: ""

  });


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

  // Extract data and state from Redux
  const { commonModuleData, status, error } = useSelector(
    (state) => state.commonCode
  );


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


  const filteredModuleData = useMemo(() => {
    return moduleData.filter((data) => data.MODULE_CD === module);
  }, [module, moduleData]);

  useEffect(() => {
    // Initialize `tableData` only if it hasn't been manually modified
    if (!hasChanges) {
      setTableData(filteredModuleData || []);
    }
  }, [filteredModuleData, hasChanges]);

  //select M_dvn and code_no
  const handleModuleSelect = (module) => {
    console.log("modal is selected");

    setSelectedModule(module);
    // setSelectedEmployee(user.EMP_CD);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // module base data fetch from select
  const handleModuleChange = (event) => {
    setModule(event.target.value);
  };

  const Save_Click = async () => {

    const requiredFields = [
      "M_DVN",
      "C_DVN",
      "CODE_NO",
      "CODE_NM",
      "CODE_NMH",
      "CODE_NMA",
      "CODE_NMO",
      "SUB_GUN1",
      "SUB_GUN2",
      "SUB_GUN3",
      "SUB_GUN4",
      "SUB_GUN5",
      "SORT_B",
      "RMK"
    ];

    // Check if all required fields are filled
    const isValid = requiredFields.every((field) => newRowData[field]?.trim() !== "");

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(updateModuleData(newRowData));

      setTableData((prevData) => {
        const rowIndex = prevData.findIndex(
          (row) => row.CODE_NO === newRowData.CODE_NO
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
      if (selectedModule) {
        await dispatch(fetchmoduleData(selectedModule));
      }
      setOpenModal(false);
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


  const handleModalOpen = () => {
    setNewRowData({
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

  const startIndex = (page - 1) * rowsPerPage;
  const currentData = moduleData.slice(startIndex, startIndex + rowsPerPage);

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
    <>
      <AddCommonCode
        openModal={openModal}
        handleClose={handleModalClose}
        handleAdd={Save_Click}
        handleNewRowChange={handleNewRowChange}
        moduleName={moduleName}
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
              disabled={!selectedModule}
            >
              <Add style={{ color: "#f7bd1d", fontSize: "16px" }} />
              New Row
            </Button>
          </Box>
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
            <TableContainer sx={{
              height: "93%", scrollbarWidth: "thin",
              scrollbarColor: "#4c5bb5 transparent",
            }}>
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
                          backgroundColor: (theme) => theme.palette.primary.main,
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
                        <span>No data available. Please select a module.</span>
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
              <TableContainer sx={{
                minHeight: "100%", scrollbarWidth: "thin",
                scrollbarColor: "#4c5bb5 transparent",
              }}>
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
                                InputProps={{
                                  readOnly: true, // This makes the field readonly without disabling it
                                }}
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

export default GLCMA100300;
