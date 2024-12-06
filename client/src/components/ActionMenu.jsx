import React from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ActionMenu = ({ rowData, onEdit, onRename, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { onEdit(rowData); handleClose(); }}>Edit</MenuItem>
        <MenuItem onClick={() => { onRename(rowData); handleClose(); }}>Rename</MenuItem>
        <MenuItem onClick={() => { onDelete(rowData); handleClose(); }}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;
