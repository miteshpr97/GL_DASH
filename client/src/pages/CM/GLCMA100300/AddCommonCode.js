import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Grid,
} from "@mui/material";

const standardStyles = {
  '& .MuiOutlinedInput-root': {
    height: '30px',  // Uniform height for all inputs
    fontSize: '14px',  // Uniform font size for input text
    marginTop: '4px',
    fontWeight: 400,
  },
  '& .MuiInputBase-input::placeholder': {
    fontSize: '14px',
    fontWeight: 500,
    color: 'gray',
  },

  '& .css-1aojskj-MuiFormLabel-root-MuiInputLabel-root': {
    top: -7
  },

  '& .MuiInputLabel-root': {
    fontSize: '0.85rem',  // Uniform label font size
    fontWeight: 500,
    color: '#5A5A5A',
  },
};

const AddCommonCode = ({
  openModal,
  handleClose,
  handleAdd,
  moduleName,
  newRowData,
  handleNewRowChange,
  mode
}) => {
  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle> </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {moduleName.map((col, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <TextField
                name={col.id}
                label={col.label}
                value={newRowData[col.id] || ""}
                onChange={handleNewRowChange}
                fullWidth
                margin="dense"
                disabled={col.readonly}
                sx={{
                  ...standardStyles,
                  width: '100%'  // Set width to 100% or adjust as needed
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          sx={{
            '&:hover': {
              color: 'white', // Font color on hover
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          color="primary"
          sx={{
            '&:hover': {
              color: 'white', // Font color on hover
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommonCode;
