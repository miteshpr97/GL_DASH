
import {  Box, Grid } from "@mui/material";
import {
  InputFieldComponent,
  SelectComponent,
} from "../../../components/CustomFormComponents";

const RegTrans = ({  regisData, handleChange }) => {
  const refTypeData = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "type3", label: "Type 3" },
  ];


  return (
    <Box >
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
            label="YEAR CODE"
            variant="outlined"
            name="YEAR_CD"
            required
            fullWidth
            size="small"
            value={regisData.YEAR_CD}
            onChange={handleChange}
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
       
      </Grid>
    </Box>
 
  
  );
};

export default RegTrans;
