import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  InputFieldComponent,
  SelectComponent,
  DateInputComponent,
} from "../../../components/CustomFormComponents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import CustomPagination from "../../../components/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCreationData,
  createUserData,
} from "../../../features/userCreationSlice";
import { setAlert } from "../../../features/alertSlice";
import SearchTextField from "../../../components/SearchTextField";

const GLCMA100100 = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const Save_Click =async (event) => {
    if (event) {
      event.preventDefault();
    }
    // Basic validation
    if (!userData.EMP_FNM ||
      !userData.EMP_SNM ||
      !userData.EMP_LNM ||
      !userData.EMAIL ||
      !userData.MOB_NO_01 ||
      !userData.POS_CD ||
      !userData.DEPT_CD ||
      !userData.EMAIL_PER ||
      !userData.MOB_NO_02 ||
      !userData.EMP_TP ||
      !userData.REF_NO ||
      !userData.STATUS ||
      !userData.DATE_JOIN ||
      !userData.DATE_BIRTH ||
      !userData.GENDER ||
      !userData.RELIGION ||
      !userData.ADD_01 ||
      !userData.ADD_STATE ||
      !userData.ADD_LANDMARK ||
      !userData.ADD_CITY ||
      !userData.ADD_PIN ||
      !userData.PAN_CARD ||
      !userData.NATION_ID

    ) {
      dispatch(setAlert({ msg: 'Please fill all required fields', alertType: 'danger' }));
      return;
    }
    dispatch(createUserData(userData));
    dispatch(fetchUserCreationData());
    setUserData(initialUserData);

  };


  const Inquery_Click = (event) =>{
    const firstInput = document.querySelector('input[name="search"]');
    console.log(firstInput);
    
    if (firstInput) {
      firstInput.focus();
    }
  }

  const handleUserSelect = (user) => {
    console.log("Selected employee data:", user);
    setUserData(user);
    setSelectedEmployee(user.EMP_CD);
  };

  const handleRefresh = () => {
    setUserData(initialUserData);
    setSelectedEmployee(null);
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
        p: 1,
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
          justifyContent: "space-between",
        }}
      >
      
        <CommonBtn PAGE_CD="GLCMA100100" SAVE_CLICK={Save_Click} INQUERY_CLICK={Inquery_Click} />
      <SearchTextField placeholder="Search for items..."/>

      </Box>
   

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 1,
          backgroundColor: "#f5f5f5",
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

        {/* Main Form for Employee Details */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 2,
            p: 2,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <PersonAddIcon style={{ color: "#f7bd1d", marginRight: "8px" }} />{" "}
              Employee Details
            </Typography>
            <span>
              <button
                onClick={handleRefresh}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#1976d2",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <RefreshIcon
                  style={{
                    marginRight: "5px",
                    color: "#1976d2",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "rotate(360deg)"; // Rotate the icon on hover
                    e.target.style.color = "#004ba0"; // Darker shade on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "rotate(0deg)"; // Reset rotation
                    e.target.style.color = "#1976d2"; // Reset color
                  }}
                />{" "}
                {/* Primary color for RefreshIcon */}
                Refresh
              </button>
            </span>
          </div>

          <Grid
            container
            spacing={1}
            sx={{ "& > .MuiGrid-item": { marginBottom: "-17px" }
          }}
          >
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="First Name"
                placeholder="First Name"
                name="EMP_FNM"
                value={userData.EMP_FNM}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Second Name"
                placeholder="Second Name"
                name="EMP_SNM"
                value={userData.EMP_SNM}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Middle Name"
                placeholder="Middle Name"
                name="EMP_MNM"
                value={userData.EMP_MNM}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Last Name"
                placeholder="Last Name"
                name="EMP_LNM"
                value={userData.EMP_LNM}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <SelectComponent
                label="Gender"
                options={genderOptions}
                name="GENDER"
                value={userData.GENDER}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ marginTop: "15px" }}>
              <DateInputComponent
                label="Date of Birth"
                name="DATE_BIRTH"
                value={userData.DATE_BIRTH}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Email"
                name="EMAIL"
                value={userData.EMAIL}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="EMAIL_PER"
                name="EMAIL_PER"
                value={userData.EMAIL_PER}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Mobile No 1"
                name="MOB_NO_01"
                value={userData.MOB_NO_01}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Mobile No 2"
                name="MOB_NO_02"
                value={userData.MOB_NO_02}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="PAN Card"
                name="PAN_CARD"
                value={userData.PAN_CARD}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Employee Type"
                name="EMP_TP"
                value={userData.EMP_TP}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="REF_No"
                name="REF_NO"
                value={userData.REF_NO}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Status"
                name="STATUS"
                value={userData.STATUS}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Department Code"
                name="DEPT_CD"
                value={userData.DEPT_CD}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Position Code"
                name="POS_CD"
                value={userData.POS_CD}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ marginTop: "15px" }}>
              <DateInputComponent
                label="Date Joined"
                name="DATE_JOIN"
                value={userData.DATE_JOIN}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <InputFieldComponent
                label="Address"
                placeholder="ADD_01"
                name="ADD_01"
                value={userData.ADD_01}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Landmark"
                placeholder="Landmark"
                name="ADD_LANDMARK"
                value={userData.ADD_LANDMARK}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="State"
                placeholder="ADD_STATE"
                name="ADD_STATE"
                value={userData.ADD_STATE}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="City"
                placeholder="City"
                name="ADD_CITY"
                value={userData.ADD_CITY}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Pin Code"
                placeholder="Pin Code"
                name="ADD_PIN"
                value={userData.ADD_PIN}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Religion"
                placeholder="Religion"
                name="RELIGION"
                value={userData.RELIGION}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputFieldComponent
                label="Nation ID"
                name="NATION_ID"
                value={userData.NATION_ID}
                onChange={handleInputChange}
                readOnly={!!selectedEmployee}
                required
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default GLCMA100100;
