import React, { useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserAccess,
  fetchUserPermissions,
  togglePermission,
  updateUserPermissions
} from "../../../features/userAccessSlice";


const AccessTable = ({ EMP_CD }) => {
  const dispatch = useDispatch();
  const { userAccess, permissions, loading } = useSelector(
    (state) => state.userAccess
  );

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchUserAccess());
    if (EMP_CD) {
      dispatch(fetchUserPermissions(EMP_CD));
    }
  }, [EMP_CD, dispatch]);

  // Toggle Checkbox State
  const handleCheckboxChange = (index, field) => {
    dispatch(togglePermission({ index, field }));
  };


  const updateUserAccess = () => {
    dispatch(updateUserPermissions({ EMP_CD, updatedPermissions: permissions, userAccess }));
  }

  // Styles
  const tableStyles = {
    container: {
      width: "100%",
      maxHeight: "100%",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    table: { minWidth: "100%" },
    headerCell: {
      fontWeight: "bold",
      fontSize: "0.75rem",
      backgroundColor: "#4c5bb5",
      color: "#fff",
      textAlign: "center",
      padding: "8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    row: {
      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
      "&:hover": { backgroundColor: "#f1f1f1" },
    },
    cell: {
      textAlign: "center",
      fontSize: "0.65rem",
      padding: "6px",
      // fontWeight: "bold",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <button onClick={updateUserAccess}> Update</button>
      <TableContainer style={tableStyles.container}>
        <Table size="small" stickyHeader style={tableStyles.table}>
          <TableHead>
            <TableRow>
              {[
                "Module",
                "ID",
                "Menu",
                "Page ID",
                "Name",
                "Y/N",
                "Inquiry",
                "Save",
                "Update",
                "Delete",
                "App Y1",
                "App Y2",
                "App Y3",
                "App Y4",
                "App Y5",
                "App Y6",
                "Print",
                "Excel",
              ].map((header) => (
                <TableCell key={header} style={tableStyles.headerCell}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userAccess.map((row, index) => (
              <TableRow key={index} sx={tableStyles.row}>
                <TableCell style={tableStyles.cell}>{row.MODULE_CD}</TableCell>
                <TableCell style={tableStyles.cell}>{row.MENU_CD}</TableCell>
                <TableCell style={tableStyles.cell}>{row.MENU_NM}</TableCell>
                <TableCell style={tableStyles.cell}>{row.PAGE_ID}</TableCell>
                <TableCell style={tableStyles.cell}>{row.PAGE_NM}</TableCell>
                {[
                  "PAGE_YN",
                  "PAGE_INQUIRY",
                  "PAGE_SAVE",
                  "PAGE_UPDATE",
                  "PAGE_DELETE",
                  "PAGE_APP_Y1",
                  "PAGE_APP_Y2",
                  "PAGE_APP_Y3",
                  "PAGE_APP_Y4",
                  "PAGE_APP_Y5",
                  "PAGE_APP_Y6",
                  "PAGE_PRINT",
                  "PAGE_EXCEL",
                ].map((field) => (
                  <TableCell
                    align="center"
                    style={tableStyles.cell}
                    key={field}
                  >
                    <Checkbox
                      checked={permissions[index]?.[field] || false}
                      onChange={() => handleCheckboxChange(index, field)}
                      size="small"
                      sx={{
                        "&.Mui-checked": {
                          color: "#007bff",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "0.85rem",
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
    </>
  );
};

export default AccessTable;
