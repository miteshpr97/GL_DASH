import * as React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Menu,
  Divider,
  Button,
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";
import { fetchTransData } from "../features/tranSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { field: "REF_TNO", headerName: "Reference No", width: 150 },
  { field: "REF_TYPE", headerName: "Reference Type", width: 150 },
  { field: "REF_NO", headerName: "Invoice No", width: 150 },
  { field: "REF_DESC", headerName: "Description", width: 250 },
  { field: "RMKS", headerName: "Remarks", width: 200 },
  { field: "LCURR_CD", headerName: "Local Currency", width: 150 },
  { field: "LAMT", headerName: "Local Amount", width: 150 },
  { field: "EXCHANGE_RATE", headerName: "Exchange Rate", width: 150 },
  { field: "FCURR_CD", headerName: "Foreign Currency", width: 150 },
  { field: "FAMT", headerName: "Foreign Amount", width: 150 },
  { field: "DOC_DTE", headerName: "Document Date", width: 150 },
  { field: "POST_DTE", headerName: "Posting Date", width: 150 },
  { field: "REG_DATE", headerName: "Registration Date", width: 200 },
  { field: "REG_BY", headerName: "Registered By", width: 150 },
  { field: "DOC_STATUS", headerName: "Document Status", width: 150 },
  { field: "YEAR_CD", headerName: "Year", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => <ActionMenu rowData={params.row} />,
  },
];

function ActionMenu({ rowData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("Edit", rowData);
    handleClose();
  };

  const handleRename = () => {
    console.log("Rename", rowData);
    handleClose();
  };

  const handleDelete = () => {
    console.log("Delete", rowData);
    handleClose();
  };

  return (
    <Box>
      <IconButton size="small" onClick={handleClick}>
        <MoreHorizRoundedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Move</MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default function DataTable() {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const {
    TransData,
    status,
    error,
  } = useSelector((state) => state.TransCreation);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransData());
    }
  }, [dispatch, status]);

  console.log(TransData, "TransData");

  const handleSearch = debounce((value) => {
    setRows(
      TransData.filter(
        (row) =>
          row.REF_NO.toLowerCase().includes(value.toLowerCase()) ||
          row.REF_DESC.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, 300);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    handleSearch(event.target.value);
  };

  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    setRows(TransData.filter((row) => !value || row.DOC_STATUS === value));
  };

  const handleClearFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setRows(TransData);
  };

  // Ensure unique `id` for each row
  const rowsWithIds = TransData.map((row) => ({
    ...row,
    id: row.REF_TNO, // Use REF_TNO as unique identifier for each row
  }));

  return (
    <Box sx={{ width: "100%"}}>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <TextField
          label="Search for order"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
          size="small"
        />
        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value="">Filter by status</MenuItem>
          <MenuItem value="A">Active</MenuItem>
          <MenuItem value="I">Inactive</MenuItem>
        </Select>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            color: "#374151", 
            backgroundColor: "white", 
            borderColor: "#CBD5E1", 
            "&:hover": {
              borderColor: "#1D4ED8", 
              backgroundColor: "#E0F2FE", 
              color: "#1D4ED8", 
            },
            padding: "6px 12px",
            borderRadius: "8px",
            fontWeight: "500", 
            fontSize: "14px",
            transition: "all 0.3s ease",
          }}
        >
          Clear Filters
        </Button>
      </Box>

      <DataGrid
        rows={rowsWithIds}  // Use the transformed rows with unique `id`
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.REF_TNO} // Alternatively, you can use this method
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            color: "black",
            fontSize: "14px",
          },
          width: "100%",
        }}
      />
    </Box>
  );
}
