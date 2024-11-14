import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { Stack } from "@mui/material";
import { _post_WithoutToken } from "../../CommonUtilAPI/GLApiClient";

const CommonBtn = ({ PAGE_CD, SAVE_CLICK }) => {
  const [permissions, setPermissions] = useState(null);
  console.log(PAGE_CD, "page btn code");

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await _post_WithoutToken("/api/AccessRight/", {
          USER_CD: window.sessionStorage.getItem("USER_CD"),
          PAGE_CD: PAGE_CD,
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data, "data 12345");
          const pagePermissions = data.find((page) => page.PAGE_CD === PAGE_CD);
          setPermissions(pagePermissions);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
    console.log("after fetch permissions");
  }, [PAGE_CD]);

  const handleClick = (action) => {
    alert(`${action} button clicked!`);
  };

  if (!permissions) {
    return <div style={{color:"#ffffff"}}>Loading...</div>;
  }

  return (
    <Stack direction="row" spacing={2}>
      {permissions.PAGE_INQUIRY === "Y" && (
        <CustomButton
          variant="solid"
          onClick={() => handleClick("INQUIRY")}
          sx={{ backgroundColor: "#1976d2", color:"white", padding: "1px 4px", fontSize: "12px",   }} // Blue for Inquiry
        >
          INQUIRY
        </CustomButton>
      )}

      {permissions.PAGE_SAVE === "Y" && (
        <CustomButton
          variant=""
          onClick={() => SAVE_CLICK()}
          sx={{ backgroundColor: "#388e3c",color:"white", padding: "1px 4px",fontSize: "12px", }} // Green for Save
        >
          SAVE
        </CustomButton>
      )}

      {permissions.PAGE_UPDATE === "Y" && (
        <CustomButton
          variant="solid"
          onClick={() => handleClick("UPDATE")}
          sx={{ backgroundColor: "#ff9800", color: "white", padding: "1px 4px", fontSize: "12px", }} // Orange for Update
        >
          UPDATE
        </CustomButton>
      )}

      {permissions.PAGE_DELETE === "Y" && (
        <CustomButton
          variant="solid"
          onClick={() => handleClick("DELETE")}
          sx={{ backgroundColor: "#d32f2f", color: "white", padding: "1px 4px", fontSize: "12px", }} // Red for Delete
        >
          DELETE
        </CustomButton>
      )}

      {permissions.PAGE_EXCEL === "Y" && (
        <CustomButton
          variant="solid"
          onClick={() => handleClick("EXCEL")}
          sx={{ backgroundColor: "#6a1b9a", color: "white", padding: "1px 4px", fontSize: "12px", }} // Purple for Excel
        >
          EXCEL
        </CustomButton>
      )}
    </Stack>
  );
};

export default CommonBtn;
