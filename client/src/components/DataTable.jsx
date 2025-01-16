// src/DataTable.js
import * as React from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "lodash";

export default function DataTable({
  rows: initialRows,
  columns,
  inputRef,
  onEdit,
  onRename,
  onDelete,
}) {
  console.log(inputRef, "searrarssfcs");

  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  // const handleSearch = debounce((value) => {
  //   setRows(
  //     initialRows.filter(
  //       (row) =>
  //         row.invoice.toLowerCase().includes(value.toLowerCase()) ||
  //         row.customer.toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  // }, 300);

  const handleSearch = debounce((value) => {
    setRows(
      rows.filter(
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
    setRows(initialRows.filter((row) => !value || row.status === value));
  };

  const handleClearFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setRows(initialRows);
  };

  const rowsWithIds = initialRows.map((row) => ({
    ...row,
    id: row.REF_TNO,
  }));

  return (
    <Box sx={{ width: "100%", scrollbarWidth: "thin",
      scrollbarColor: "#4c5bb5 transparent", }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Search for order"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
          size="small"
          ref={inputRef}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "30px", // Reduced height further
            },
            "& .MuiInputBase-input": {
              padding: "4px 8px", // Adjust padding for inner text
              fontSize: "14px", // Optional: Adjust font size for better appearance
            },
            "& .MuiInputLabel-root": {
              fontSize: "12px", // Optional: Adjust label font size
            },
          }}
        />

        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              height: "30px", // Reduced dropdown height
            },
            "& .MuiSelect-select": {
              padding: "4px 8px", // Adjust padding inside dropdown
              fontSize: "14px", // Optional: Adjust font size
            },
          }}
        >
          <MenuItem value="" sx={{ fontSize: "14px" }}>
            Filter by status
          </MenuItem>
          <MenuItem value="Paid" sx={{ fontSize: "14px" }}>
            Paid
          </MenuItem>
          <MenuItem value="Cancelled" sx={{ fontSize: "14px" }}>
            Cancelled
          </MenuItem>
          <MenuItem value="Refunded" sx={{ fontSize: "14px" }}>
            Refunded
          </MenuItem>
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
            padding: "4px 12px",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            transition: "all 0.3s ease",
          }}
        >
          Clear Filters
        </Button>
      </Box>

      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            color: "black",
            fontSize: "13px",
            padding: "5px",
          },
          "& .MuiDataGrid-columnHeaderDraggableContainer ": {
            height: "30px",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "12px",
          },
          "& .MuiCheckbox-root": {
            size: "small", // Set checkbox size to small
            "& .MuiSvgIcon-root": {
              fontSize: "0.8rem", // Adjust the size of the checkbox icon
            },
          },
          width: "100%",
        }}
      />
    </Box>
  );
}
