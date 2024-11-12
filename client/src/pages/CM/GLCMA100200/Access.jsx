import React, { useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
} from "@mui/material";

const Access = () => {
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

  // Styles
  const tableContainerStyle = {
    width:"100%",
    maxHeight: "400px",
    marginBottom: "16px",
  };
  const tableStyle = {
    minWidth: "800px",
  };
  const tableCellStyle = {
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  };
  const tableRowStyle = {
    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
  };
  const tableCellRow = {
    textAlign: "center",
  };

  // Handlers
  const handleCheckboxChange = (index, field) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [index]: {
        ...prevPermissions[index],
        [field]: !prevPermissions[index]?.[field],
      },
    }));
  };

  return (
    <>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table size="small" stickyHeader style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell style={tableCellStyle}>Module</TableCell>
              <TableCell style={tableCellStyle}>ID</TableCell>
              <TableCell style={tableCellStyle}>Menu</TableCell>
              <TableCell style={tableCellStyle}>Page ID</TableCell>
              <TableCell style={tableCellStyle}>Name</TableCell>
              <TableCell style={tableCellStyle}>Y/N</TableCell>
              <TableCell style={tableCellStyle}>Inquiry</TableCell>
              <TableCell style={tableCellStyle}>Save</TableCell>
              <TableCell style={tableCellStyle}>Update</TableCell>
              <TableCell style={tableCellStyle}>Delete</TableCell>
              <TableCell style={tableCellStyle}>App Y1</TableCell>
              <TableCell style={tableCellStyle}>App Y2</TableCell>
              <TableCell style={tableCellStyle}>App Y3</TableCell>
              <TableCell style={tableCellStyle}>App Y4</TableCell>
              <TableCell style={tableCellStyle}>App Y5</TableCell>
              <TableCell style={tableCellStyle}>App Y6</TableCell>
              <TableCell style={tableCellStyle}>Print</TableCell>
              <TableCell style={tableCellStyle}>Excel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index} style={tableRowStyle}>
                <TableCell style={tableCellRow}>{row.MODULE_CD}</TableCell>
                <TableCell style={tableCellRow}>{row.MENU_CD}</TableCell>
                <TableCell style={tableCellRow}>{row.MENU_NM}</TableCell>
                <TableCell style={tableCellRow}>{row.PAGE_ID}</TableCell>
                <TableCell style={tableCellRow}>{row.PAGE_NM}</TableCell>
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
                  <TableCell align="center" style={tableCellRow} key={field}>
                    <Checkbox
                      checked={permissions[index]?.[field] || false}
                      onChange={() => handleCheckboxChange(index, field)}
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

export default Access;
