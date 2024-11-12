
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const rows = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "A",
      name: "Anjali Sharma",
      email: "anjali.sharma@email.com",
    },
  },
  // Add more rows as needed
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function OrderTable() {
  const [order, setOrder] = React.useState("desc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 7; // Display 7 rows per page
  const totalPage = Math.ceil(rows.length / rowsPerPage);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Handle page change functions
  const prevPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const nextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPage));
  const pageSwitch = (page) => setCurrentPage(page);

  // Paginate rows to display
  const displayedRows = rows
    .filter(row => row.customer.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = displayedRows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const renderPagination = () => (
    <Box
      sx={{
        pt: 2,
        gap: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Button
        size="small"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1, textAlign: 'center' }}>
        {[...Array(totalPage)].map((_, index) => (
          <IconButton
            key={index + 1}
            size="small"
            variant={currentPage === index + 1 ? "outlined" : "plain"}
            color="neutral"
            onClick={() => pageSwitch(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </Box>

      <Button
        size="small"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={nextPage}
        disabled={currentPage === totalPage}
      >
        Next
      </Button>
    </Box>
  );

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="small">
        <FormLabel>Status</FormLabel>
        <Select size="small" placeholder="Filter by status">
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="refunded">Refunded</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      {/* Add more filters if necessary */}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Paper sx={{ my: 1, p: 2 }}>
        <Input
          size="small"
          placeholder="Search by customer name"
          startDecorator={<SearchIcon />}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
    
       
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={displayedRows.length > 0 && selected.length === displayedRows.length}
                  color="primary"
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(row.id) !== -1}
                    onChange={(event) => handleSelectOne(event, row.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={row.status === 'Paid' ? 'success' : row.status === 'Refunded' ? 'warning' : 'error'} />
                </TableCell>
                <TableCell>
                  <Avatar>{row.customer.initial}</Avatar>
                  <Link href={`mailto:${row.customer.email}`}>{row.customer.name}</Link>
                </TableCell>
                <TableCell>
                  <RowMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {renderPagination()}
    </React.Fragment>
  );
}

function RowMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Move</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} color="error">Delete</MenuItem>
      </Menu>
    </Box>
  );
}
