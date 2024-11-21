import React, { useState } from 'react'
import { Box, Button} from "@mui/material";
import CommonBtn from "../../../components/CustomBtn/CommonBtn";
import DataTable from "../../../components/DataTable";
import RegTrans from './RegTrans';

const GLAMT100100 = () => {
    const [openModal, setOpenModal] = useState(false);

    const Save_Click = (event) => {
      if (event) {
        event.preventDefault();
      }
    };
  
    const handleRegistrationModal = () => {
      setOpenModal(true);
    };
  
    const handlecloseModal = () => {
      setOpenModal(false);
    };
  
  
  
    return (
      <>
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
              justifyContent: "space-between", // Simplify alignment
              width: "100%",
            }}
          >
            <Box sx={{ flex: 7 }}>
              <CommonBtn PAGE_CD="GLCMA100100" SAVE_CLICK={Save_Click} />
            </Box>
  
            <Box sx={{ flex: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ padding: "2px 8px" }}
                onClick={handleRegistrationModal}
              >
                NEW REGISTRATION
              </Button>
            </Box>
          </Box>
  
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr", // Ensures DataTable takes full width
              gap: 1,
              borderRadius: 1,
              p: 1,
              boxShadow: 2,
              height: "calc(100vh - 150px)",
              width: "100%",
              overflow: "auto",
            }}
          >
            <DataTable />
          </Box>
        </Box>



        <RegTrans open={openModal} onClose={handlecloseModal} />
      </>
    );
  };
  
  export default GLAMT100100;
  