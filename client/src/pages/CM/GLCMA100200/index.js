import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
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
  fetchUserAccess,
  fetchUserPermissions,
  togglePermission,
  updateUserPermissions
} from "../../../features/userAccessSlice";
import {
  fetchUserCreationData,
} from "../../../features/userCreationSlice";
import ProfilePhoto from "../../../assets/profilepic2.jpg";
import AccessTable from "./Access";

const GLCMA100200 = () => {
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

  const { userAccess, permissions, loading } = useSelector(
    (state) => state.userAccess
  );


  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchUserAccess());
    if (selectedEmployee) {
      dispatch(fetchUserPermissions(selectedEmployee));
    }
  }, [selectedEmployee, dispatch]);

  // Toggle Checkbox State
  const handleCheckboxChange = (index, field) => {
    dispatch(togglePermission({ index, field }));
  };


  //userData as userDataList use because of  clashing
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
    dispatch(updateUserPermissions({ EMP_CD: selectedEmployee, updatedPermissions: permissions, userAccess }));


  };


  const handleUserSelect = (user) => {
    console.log("Selected employee data:", user);
    setUserData(user);
    setSelectedEmployee(user.EMP_CD);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
          // position: "sticky",
          // top: "0",
        }}
      >
        <CommonBtn PAGE_CD="GLCMA100200" SAVE_CLICK={Save_Click} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 1,
          borderRadius: 1,
          p: 1,
          boxShadow: 2,
          height: "calc(100vh - 150px)",
        }}
      >
        {/*  User List */}
        <Box
          sx={{
            width: { xs: "100%", md: "250px" },
            flexShrink: 0,

            borderRadius: 1,
            boxShadow: 2,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
                        // background:"#1976d2",
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
            flex: 1,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              height: "40%",
              width: "100%",
            }}
          >
            {/* Left Section */}
            <Box
              sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 0.6,
                    width: "calc(100% - 10px)",
                    "& .MuiInputBase-root": {
                      fontSize: "0.65rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.65rem",
                    },
                  },
                  paddingTop: "5px",
                  maxHeight: "100%",
                  overflowY: "auto",
                  width: "100%%",
                }}
                noValidate
                autoComplete="off"
              >
                <Grid container>
                  {[
                    { label: "EMP ID", name: "EMP_CD", value: userData.EMP_CD },
                    {
                      label: "MOB NO",
                      name: "MOB_NO_01",
                      value: userData.MOB_NO_01,
                    },
                    { label: "Name", name: "EMP_FNM", value: userData.EMP_FNM },
                    {
                      label: "Landline",
                      name: "MOB_PER_01",
                      value: userData.MOB_PER_01,
                    },
                    {
                      label: "Department",
                      name: "DEPT_CD",
                      value: userData.DEPT_CD,
                    },
                    {
                      label: "Position",
                      name: "POS_CD",
                      value: userData.POS_CD,
                    },
                    { label: "Email", name: "EMAIL", value: userData.EMAIL },
                  ].map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <TextField
                        label={field.label}
                        placeholder={field.label}
                        name={field.name}
                        value={field.value}
                        readOnly={!!selectedEmployee}
                        size="small"
                        required
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                width: "30%",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "100%",
                overflowY: "auto",

              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "40%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <img src={ProfilePhoto} alt="" style={{ height: "100%" }} />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  maxHeight: "60%",
                  overflowY: "auto",
                  padding: "5px",
                }}
              >
                <Stack spacing={0.5}>
                  <Button
                    variant="contained"
                    sx={{ fontSize: "0.65rem", padding: "3px 10px" }}
                  >
                    Password reset
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ fontSize: "0.65rem", padding: "3px 10px" }}
                    color="error"
                  >
                    Block
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ fontSize: "0.65rem", padding: "3px 10px" }}
                    color="success"
                  >
                    Activate
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "calc(100vw - 550px)",
              maxHeight: "60%",
              overflowY: "auto",
              background: "white",
            }}
          >
            <AccessTable
            handleCheckboxChange={handleCheckboxChange}
            userAccess={userAccess}
            permissions={permissions}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GLCMA100200