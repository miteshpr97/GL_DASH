import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { InputFieldComponent } from "../../../components/CustomFormComponents";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import CustomPagination from "../../../components/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCreationData,
  createUserData,
} from "../../../features/userCreationSlice";
import ProfilePhoto from "../../../assets/profilepic2.jpg";
import Access from "./Access";

const UserAccess = () => {
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
    dispatch(createUserData(userData));
    setUserData(initialUserData);
    dispatch(fetchUserCreationData(userData));
  };

  const handleUserSelect = (user) => {
    console.log("Selected employee data:", user);
    setUserData(user);
    setSelectedEmployee(user.EMP_CD);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // // Conditional rendering for loading, error, and data
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

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
        p: 2,
        // backgroundColor: "#e0e0e0",
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
        <CommonBtn PAGE_CD="GLCMA100100" SAVE_CLICK={Save_Click} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          p: 2,
          boxShadow: 2,
          // height: "calc(100vh - 100px)",
          height:"100%"
        }}
      >
        {/*  User List */}
        <Box
          sx={{
            width: { xs: "100%", md: "300px" },
            flexShrink: 0,

            borderRadius: 1,
            boxShadow: 2,
            background: "#ffffff",
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

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              height: "50%",
              width: "100%",
            }}
          >
            {/* Left Section */}
            <Box
              sx={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: "-10px",
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{ "& > .MuiGrid-item": { mb: "-17px" } }}
              >
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
                  { label: "Position", name: "POS_CD", value: userData.POS_CD },
                  { label: "Email", name: "EMAIL", value: userData.EMAIL },
                ].map((field, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <InputFieldComponent
                      label={field.label}
                      placeholder={field.label}
                      name={field.name}
                      value={field.value}
                      readOnly={!!selectedEmployee}
                      required
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                width: "40%",
                borderRadius: 1,
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={ProfilePhoto} alt="" style={{ width: "30%" }} />

              <Box sx={{ width: "65%" }}>
                <Stack spacing={1}>
                  <Button
                    variant="contained"
                    sx={{ flexGrow: 1, fontSize: "10px", padding: "5px 10px" }}
                  >
                    Password reset
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ flexGrow: 1, fontSize: "11px", padding: "5px 10px" }}
                    color="error"
                  >
                    Block
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ flexGrow: 1, fontSize: "11px", padding: "5px 10px" }}
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
              width: { xs: "100%", md: "700px" },
              height: "50%",
              // backgroundColor: "#e3f2fd",
              
            }}
          >
          <Access/>
          </Box>
        </Box>

        
      </Box>
    </Box>
  );
};

export default UserAccess;
