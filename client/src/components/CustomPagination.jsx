import React from 'react';
import { Pagination, Stack } from '@mui/material';

const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Pagination
        count={totalPages}  // Dynamically set total pages
        page={currentPage}  // Set the current page
        onChange={handlePageChange}  // Handle page change
        shape="rounded"  // Rounded corners for pagination buttons
        size="small"  // Use small size for buttons
        sx={{
            '& .MuiPaginationItem-root': {
              color: 'black',  // Default color of the page buttons
              borderColor: 'gray',  // Default border color
              '&:hover': {
                backgroundColor: '#f0f0f0',  // Hover effect
              },
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: '#1976d2',  // Active page background color
              color: 'white',  // Active page text color
              '&:hover': {
                backgroundColor: '#1565c0',  // Hover effect on the active page
              },
            },
          }}
      />
    </Stack>
  );
};

export default CustomPagination;
