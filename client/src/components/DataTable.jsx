// src/DataTable.js
import * as React from 'react';
import { Box, TextField, Select, MenuItem, Chip, IconButton, Menu, Divider, Button } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { DataGrid } from '@mui/x-data-grid';
import { debounce } from 'lodash';

const columns = [
  { field: 'invoice', headerName: 'Invoice', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={
          params.value === 'Paid'
            ? 'success'
            : params.value === 'Cancelled'
            ? 'error'
            : 'default'
        }
        variant="outlined"
      />
    ),
  },
  { field: 'customer', headerName: 'Customer', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => <ActionMenu rowData={params.row} />,
  },
];

const initialRows = [
  { id: 1, invoice: 'INV-1234', date: 'Feb 3, 2023', status: 'Refunded', customer: 'Anjali Sharma', email: 'anjali.sharma@email.com' },
  { id: 2, invoice: 'INV-1233', date: 'Feb 3, 2023', status: 'Paid', customer: 'Rahul Verma', email: 'rahul.verma@email.com' },
  { id: 3, invoice: 'INV-1232', date: 'Feb 3, 2023', status: 'Refunded', customer: 'Priya Singh', email: 'priya.singh@email.com' },
  { id: 4, invoice: 'INV-1231', date: 'Feb 3, 2023', status: 'Refunded', customer: 'Karan Gupta', email: 'karan.gupta@email.com' },
  { id: 5, invoice: 'INV-1230', date: 'Feb 3, 2023', status: 'Cancelled', customer: 'Sneha Patel', email: 'sneha.patel@email.com' },
  { id: 6, invoice: 'INV-1229', date: 'Feb 3, 2023', status: 'Cancelled', customer: 'Vikram Joshi', email: 'vikram.joshi@email.com' },
  { id: 7, invoice: 'INV-1228', date: 'Feb 3, 2023', status: 'Refunded', customer: 'Neha Reddy', email: 'neha.reddy@email.com' },
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Move</MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} style={{ color: 'red' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default function DataTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [searchText, setSearchText] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');

  const handleSearch = debounce((value) => {
    setRows(
      initialRows.filter(
        (row) =>
          row.invoice.toLowerCase().includes(value.toLowerCase()) ||
          row.customer.toLowerCase().includes(value.toLowerCase())
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
    setRows(
      initialRows.filter(
        (row) => !value || row.status === value
      )
    );
  };

  const handleClearFilters = () => {
    setSearchText('');
    setStatusFilter('');
    setRows(initialRows);
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
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
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Refunded">Refunded</MenuItem>
        </Select>
        <Button variant="outlined" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{
            '& .MuiDataGrid-columnHeaders': {
          
              color: 'black', // Change header text color
              fontSize: '16px', // Optional: change font size
            
            },
          }}
      />
    </Box>
  );
}
