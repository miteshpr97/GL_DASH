import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField = ({ placeholder = "Search..." }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <TextField
      label={placeholder}
      variant="outlined"
      name='search'
      value={searchValue}
      onChange={handleChange}
      size='small'
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
        
          backgroundColor: '#f0f0f0', // Light background color
        },
        '& .MuiInputLabel-root': {
          color: '#888', // Label color
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ccc', // Outline color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#007bff', // Hover outline color
        },
        '& .MuiOutlinedInput-input': {
          paddingLeft: '10px', // Space for the icon
        },
      }}
    />
  );
};

export default SearchTextField;
