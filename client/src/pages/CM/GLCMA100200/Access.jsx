import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Paper,
} from "@mui/material";

const AccessTable = () => {
  // Sample Data
  const dummyData = Array.from({ length: 20 }, (_, index) => ({
    MODULE_CD: `MOD${index + 1}`,
    MENU_CD: `MNU${index + 1}`,
    MENU_NM: `Menu ${index + 1}`,
    PAGE_ID: `PG${index + 1}`,
    PAGE_NM: `Page Name ${index + 1}`,
    PAGE_YN: false,
    PAGE_INQUIRY: false,
    PAGE_SAVE: false,
    PAGE_UPDATE: false,
    PAGE_DELETE: false,
    PAGE_APP_Y1: false,
    PAGE_APP_Y2: false,
    PAGE_APP_Y3: false,
    PAGE_APP_Y4: false,
    PAGE_APP_Y5: false,
    PAGE_APP_Y6: false,
    PAGE_PRINT: false,
    PAGE_EXCEL: false,
  }));

  const [permissions, setPermissions] = useState({});

  // Toggle Checkbox State
  const handleCheckboxChange = (index, field) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [index]: {
        ...prevPermissions[index],
        [field]: !prevPermissions[index]?.[field],
      },
    }));
  };

  // Styles
  const tableStyles = {
    container: {
      width: "100%",
      maxHeight: "100%",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    table: { minWidth: "100%" },
    headerCell: {
      fontWeight: "bold",
      fontSize: "0.75rem",
      backgroundColor: "#f5f5f5",
      color: "#333",
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
      whiteSpace: "nowrap",      
      overflow: "hidden",       
      textOverflow: "ellipsis",  
    },
  };
  
  return (
    <TableContainer component={Paper} style={tableStyles.container}>
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
          {dummyData.map((row, index) => (
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
                <TableCell align="center" style={tableStyles.cell} key={field}>
                  <Checkbox
                    checked={permissions[index]?.[field] || false}
                    onChange={() => handleCheckboxChange(index, field)}
                    size="small"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccessTable;
