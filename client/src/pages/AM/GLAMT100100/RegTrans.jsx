import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  Grid,
 
} from "@mui/material";
import {
  InputFieldComponent,
  SelectComponent,
} from "../../../components/CustomFormComponents";


const getCurrentYearMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const RegTrans = ({ open, onClose }) => {
  const [regisData, setRegisData] = useState({
    REG_DATE: new Date().toISOString().split("T")[0], // Default to today's date
    REF_TNO: "AUTO_GENERATED",
    YEAR_CD: getCurrentYearMonth(),
    POST_DTE: "",
    DOC_DTE: "",
    REF_TYPE: "",
    REF_NO: "",
    REF_DESC: "",
    RMKS: "",
    LCURR_CD: "",
    LAMT: "",
    FCURR_CD: "",
    FAMT: "",
    EXCHANGE_RATE: "",
    REG_BY: "",
    DOC_STATUS: "",
  });

  const refTypeData = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "type3", label: "Type 3" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {

    console.log(regisData);
    
    // Validate required fields
    const requiredFields = [
      "POST_DTE",
      "DOC_DTE",
      "REF_TYPE",
      "REF_NO",
      "REF_DESC",
      "RMKS",
      "LCURR_CD",
      "LAMT",
      "FCURR_CD",
      "FAMT",
      "EXCHANGE_RATE",
      "REG_BY",
      "DOC_STATUS",
    ];

    const missingFields = requiredFields.filter((field) => !regisData[field]);
    if (missingFields.length > 0) {
      alert("Please fill all the required fields!");
      return;
    }

    console.log("Saved Data:", regisData);
    // Add your save logic here
    onClose(); // Close the modal after saving
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    zIndex:"1300"
  
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="registration-modal-title"
      aria-describedby="registration-modal-description"
      // BackdropProps={{
      //   style: {
      //     backgroundColor: "rgba(255, 0, 0, 0.5)",
      //   },
      // }}
      
    >
      <Box sx={style}>
        <Grid
          container
          spacing={1}
          sx={{ "& > .MuiGrid-item": { marginBottom: "-17px" } }}
        >
          <Grid item xs={4}>
            <InputFieldComponent
              label="REG DATE"
              variant="outlined"
              name="REG_DATE"
              required
              fullWidth
              size="small"
              value={regisData.REG_DATE}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="TRANSACTION REF NO"
              variant="outlined"
              name="REF_TNO"
              disabled
              fullWidth
              size="small"
              value={regisData.REF_TNO}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="YEAR CODE"
              variant="outlined"
              name="YEAR_CD"
              required
              fullWidth
              size="small"
              value={regisData.YEAR_CD}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="POSTING DATE"
              variant="outlined"
              name="POST_DTE"
              required
              fullWidth
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={regisData.POST_DTE}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="DOCUMENT DATE"
              variant="outlined"
              name="DOC_DTE"
              required
              fullWidth
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={regisData.DOC_DTE}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectComponent
              labelId="ref-type-label"
              label="REF TYPE"
              name="REF_TYPE"
              value={regisData.REF_TYPE}
              onChange={handleChange}
              options={refTypeData}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="REF NO"
              variant="outlined"
              name="REF_NO"
              required
              fullWidth
              size="small"
              value={regisData.REF_NO}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="DESC"
              variant="outlined"
              name="REF_DESC"
              required
              fullWidth
              size="small"
              value={regisData.REF_DESC}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="REMARK"
              variant="outlined"
              name="RMKS"
              required
              fullWidth
              size="small"
              value={regisData.RMKS}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="LOCAL CURRENCY"
              variant="outlined"
              name="LCURR_CD"
              required
              fullWidth
              size="small"
              value={regisData.LCURR_CD}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="LOCAL AMOUNT"
              variant="outlined"
              name="LAMT"
              required
              fullWidth
              size="small"
              value={regisData.LAMT}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="FOREIGN CURRENCY"
              variant="outlined"
              name="FCURR_CD"
              required
              fullWidth
              size="small"
              value={regisData.FCURR_CD}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="FOREIGN AMOUNT"
              variant="outlined"
              name="FAMT"
              required
              fullWidth
              size="small"
              value={regisData.FAMT}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="EXCHANGE RATE"
              variant="outlined"
              name="EXCHANGE_RATE"
              required
              fullWidth
              size="small"
              value={regisData.EXCHANGE_RATE}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="REGISTERED BY"
              variant="outlined"
              name="REG_BY"
              required
              fullWidth
              size="small"
              value={regisData.REG_BY}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputFieldComponent
              label="DOCUMENT STATUS"
              variant="outlined"
              name="DOC_STATUS"
              required
              fullWidth
              size="small"
              value={regisData.DOC_STATUS}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button variant="contained" onClick={onClose} sx={{ mr: 2  , padding: "2px 6px"}}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{padding:"2px 6px"}}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RegTrans;
