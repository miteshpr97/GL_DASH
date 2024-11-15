

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Standard style for form components
const standardStyles = {
  '& .MuiOutlinedInput-root': {
    height: '30px',  // Uniform height for all inputs
    fontSize: '14px',  // Uniform font size for input text
    marginTop: '6px',
    fontWeight: 400, 
    
   
  },
  '& .MuiInputBase-input::placeholder': {
    fontSize: '14px',
    fontWeight: 500, 
    color: 'gray', 
    
    
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.85rem',  // Uniform label font size
    fontWeight: 500, 
    color: 'gray',
  },
};

// InputFieldComponent
export const InputFieldComponent = ({ label, placeholder, name, value, onChange, error, helperText, required = false,readOnly = false, ...props }) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      error={error}
      helperText={helperText}
      sx={standardStyles}
      size="small"
      required={required}
      InputProps={{ readOnly }} 
      {...props}
    />
  );
};

// SelectComponent
export const SelectComponent = ({ label, options, name, value, onChange, error, helperText, required=false, readOnly = false, ...props }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal" error={error} sx={standardStyles} {...props}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        required={required}
      InputProps={{ readOnly }} 
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px' }}>{helperText}</p>
      )}
    </FormControl>
  );
};

// DateInputComponent
export const DateInputComponent = ({ label, name, value, onChange,required=false, readOnly = false, ...props }) => {
  return (
    <TextField
      label={label}
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      sx={standardStyles}
      required={required}
      InputProps={{ readOnly }} 
      {...props}
    />
  );
};

// Prop Types
InputFieldComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
};

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

DateInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInputComponent;
