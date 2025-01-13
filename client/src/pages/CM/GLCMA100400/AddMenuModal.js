import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, TextField } from "@mui/material";

const AddMenuModal = ({
  openModal,
  handleClose,
  handleAdd,
  moduleName,
  newRowData,
  handleNewRowChange
}) => {

  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Add New Row</DialogTitle>
      <DialogContent>
        {moduleName.map((col, idx) => (
          <TextField
            key={idx}
            name={col.id}
            label={col.label}
            value={newRowData[col.id] || ""}
            onChange={handleNewRowChange}
            fullWidth
            margin="dense"
            disabled={col.readonly}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuModal;
