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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCreationData,
  createUserData,
} from "../../../features/userCreationSlice";


const CommonCode = () => {
  const dispatch = useDispatch();

  const userColumns = [
    { id: "EMP_CD", label: "EMP_CD", minWidth: 70 },
    { id: "EMP_NM", label: "EMP Name", minWidth: 120 },
  ];

  const initialUserData = {
    EMP_CD: "",
    EMP_FNM: "",
    EMP_SNM: "",
    EMP_MNM: "",
    EMP_LNM: "",
    POS_CD: "",
    DEPT_CD: "",
    EMAIL: "",
    EMAIL_PER: "",
    MOB_NO_01: "",
    MOB_PER_01: "",
    MOB_NO_02: "",
    MOB_PER_02: "",
    EMP_TP: "",
    REF_NO: "",
    STATUS: "",
    DATE_JOIN: "",
    DATE_BIRTH: "",
    GENDER: "",
    RELIGION: "",
    ADD_01: "",
    ADD_STATE: "",
    ADD_LANDMARK: "",
    ADD_CITY: "",
    ADD_PIN: "",
    PAN_CARD: "",
    NATION_ID: "",
    REG_BY: "",
    REG_DATE: "",
    UPD_BY: null,
    UPD_DATE: null,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [Module, setModule] = useState("");

  const [tableData, setTableData] = useState([
    {
      Module: "Module1",
      codeDvn: "Dvn1",
      codeNo: "001",
      codeNm: "Name1",
      codeNmh: "NMH1",
      codeNma: "NMA1",
      codeNmo: "NMO1",
      extraField1: "Extra1",
      extraField2: "Extra2",
      extraField3: "Extra3",
    },
    {
      Module: "Module2",
      codeDvn: "Dvn2",
      codeNo: "002",
      codeNm: "Name2",
      codeNmh: "NMH2",
      codeNma: "NMA1",
      codeNmo: "NMO1",
      extraField1: "Extra1",
      extraField2: "Extra2",
      extraField3: "Extra3",
    },
    {
      Module: "Module3",
      codeDvn: "Dvn3",
      codeNo: "003",
      codeNm: "Name3",
      codeNmh: "NMH1",
      codeNma: "NMA1",
      codeNmo: "NMO1",
      extraField1: "Extra1",
      extraField2: "Extra2",
      extraField3: "Extra3",
    },
   
  
  ]);

  const {
    userData: userDataList,
    status,
    error,
  } = useSelector((state) => state.userCreation);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserCreationData());
    }
  }, [dispatch, status]);

  const Save_Click = (event) => {
    if (event) {
      event.preventDefault();
    }
    dispatch(createUserData(userData));
    setUserData(initialUserData);
    dispatch(fetchUserCreationData(userData));
  };

  const handleUserSelect = (user) => {
    setUserData(user);
    setSelectedEmployee(user.EMP_CD);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModuleChange = (event) => {
    setModule(event.target.value);
  };

  const handleTableChange = (event, index, field) => {
    const newData = [...tableData];
    newData[index][field] = event.target.value;
    setTableData(newData);
  };

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const startIndex = (page - 1) * rowsPerPage;
  const currentData = userDataList.slice(startIndex, startIndex + rowsPerPage);

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
          justifyContent: "flex-start",
        }}
      >
        <CommonBtn PAGE_CD="GLCMA100100" SAVE_CLICK={Save_Click} />
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
                  {userColumns.map((column) => (
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
                {currentData.map((user) => (
                  <TableRow
                    key={user.EMP_CD}
                    onClick={() => handleUserSelect(user)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "50px",
                      backgroundColor:
                        selectedEmployee === user.EMP_CD
                          ? "#e3eefa"
                          : "inherit",
                      transition: "background-color 0.3s ease",
                      "& .MuiTableCell-root": {
                        padding: "8px 18px",
                        fontSize: "12px",
                      },
                    }}
                  >
                    <TableCell>{user.EMP_CD}</TableCell>
                    <TableCell>{user.EMP_FNM}</TableCell>
                  </TableRow>
                ))}
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
              totalItems={userDataList.length}
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
              height: "50px",
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
                value={Module}
                label="Module"
                onChange={handleModuleChange}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="CM">CM</MenuItem>
                
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{
                fontSize: "11px",
                padding: "3px 8px",
              }}
            >
              Add New Row
            </Button>
          </Box>

          {/* Table in Light Blue Box */}
          <Box
            sx={{
              flex: 1,
              pt:1,
              maxHeight:"calc(100% - 60px)",
              overflowX: "auto",
            }}
          >
            <TableContainer sx={{ maxHeight: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead >
                  <TableRow>
                    {Object.keys(tableData[0]).map((header, idx) => (
                      <TableCell
                        key={idx}
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: "#4c5bb5",
                          color: "#fff",
                          padding: "8px 20px",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                  <TableRow key={index}>
                  {Object.keys(row).map((field, idx) => (
                    <TableCell key={idx}>
                      <TextField
                        value={row[field]}
                        variant="standard"
                        onChange={(event) => handleTableChange(event, index, field)}
                        size="small"
                        inputProps={{
                          style: {
                            fontSize: '11px', // Set your desired font size for the text here
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

export default CommonCode;
