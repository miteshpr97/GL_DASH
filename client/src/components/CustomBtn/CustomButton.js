import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const CustomButton = ({ 
  variant, 
  color, 
  size, 
  disableElevation, 
  startIcon, 
  endIcon, 
  onClick, 
  children, 
  sx,
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disableElevation={disableElevation}
      startDecorator={startIcon}
      endDecorator={endIcon}
      onClick={onClick}
      sx={{
        ...sx,
        transition: 'all 0.3s ease', // Smooth transition effects for hover state
        '&:hover': {
          transform: 'scale(1.05)', 
        },
        '&:active': {
          transform: 'scale(0.98)', // Active state effect
        },

      }}
      {...props}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  variant: PropTypes.oneOf(['plain', 'outlined', 'soft', 'solid']),
  color: PropTypes.oneOf(['neutral', 'primary', 'danger', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disableElevation: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disableElevation: false,
  startIcon: null,
  endIcon: null,
  onClick: () => {},
  sx: {},
};
  
export default CustomButton;




