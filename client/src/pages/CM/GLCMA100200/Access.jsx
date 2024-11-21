import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import {
  _getAll_WithoutToken,
  _update_WithoutToken,
} from "../../../CommonUtilAPI/GLApiClient";

const AccessTable = ({EMP_CD}) => {

  
  const [userAccess, setUserAccess] = useState("");



  // sir check 
  console.log(userAccess);

  useEffect(() => {
    const fetchData = async () => {
      try {

        //sir check this api why data not retrieve
        const response = await _getAll_WithoutToken("/api/GLCMA100200/");
        setUserAccess(response.data);

        // if (USER_CD) {
        //   const userAccessResponse = await _getAll_WithoutToken(
        //     `api/GLCMA100200/${USER_CD}`
        //   );
        //   const userAccessData = userAccessResponse.data;
        //   setUserAccessData(userAccessData);

        //   const initialState = response.data.reduce((acc, item, index) => {
        //     const userAccessItem = userAccessData.find(
        //       (ua) => ua.PAGE_CD === item.PAGE_CD
        //     );
        //     acc[index] = {
        //       PAGE_YN: userAccessItem ? userAccessItem.PAGE_YN === "Y" : false,
        //       PAGE_INQUIRY: userAccessItem
        //         ? userAccessItem.PAGE_INQUIRY === "Y"
        //         : false,
        //       PAGE_SAVE: userAccessItem
        //         ? userAccessItem.PAGE_SAVE === "Y"
        //         : false,
        //       PAGE_UPDATE: userAccessItem
        //         ? userAccessItem.PAGE_UPDATE === "Y"
        //         : false,
        //       PAGE_DELETE: userAccessItem
        //         ? userAccessItem.PAGE_DELETE === "Y"
        //         : false,
        //       PAGE_APP_Y1: userAccessItem
        //         ? userAccessItem.PAGE_APP_Y1 === "Y"
        //         : false,
        //       PAGE_APP_Y2: userAccessItem
        //         ? userAccessItem.PAGE_APP_Y2 === "Y"
        //         : false,
        //       PAGE_APP_Y3: userAccessItem
        //         ? userAccessItem.PAGE_APP_Y3 === "Y"
        //         : false,
        //       PAGE_APP_Y4: userAccessItem
        //         ? userAccessItem.PAGE_APP_Y4 === "Y"
        //         : false,
        //       PAGE_APP_Y5: userAccessItem
        //         ? userAccessItem.PAGE_APP_Y5 === "Y"
        //         : false,
        //       PAGE_APP_Y6: userAccessItem
        //         ? userAccessItem.PAGE_APP_Y6 === "Y"
        //         : false,
        //       PAGE_PRINT: userAccessItem
        //         ? userAccessItem.PAGE_PRINT === "Y"
        //         : false,
        //       PAGE_EXCEL: userAccessItem
        //         ? userAccessItem.PAGE_EXCEL === "Y"
        //         : false,
        //     };
        //     return acc;
        //   }, {});

        //   setPermissions(initialState);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

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

  return (
    <TableContainer style={tableStyles.container}>
      <Table size="small" stickyHeader style={tableStyles.table}>
        <TableHead >
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
                    sx={{
                      '& .MuiSvgIcon-root': {
                        color: '#007bff', // Set custom color
                        fontSize: '0.85rem', // Set custom size if needed
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
  );
};

export default AccessTable;
