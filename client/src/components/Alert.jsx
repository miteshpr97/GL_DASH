import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../features/alertSlice';
import { Snackbar, Alert } from '@mui/material';

const AlertComponent = () => {
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alerts.length === 0) return;

    const interval = setInterval(() => {
      if (alerts.length > 0) {
        dispatch(removeAlert(alerts[0].id));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [alerts, dispatch]);

  return (
    <>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <Snackbar
            key={alert.id}
            open={true}
            autoHideDuration={3000}
            onClose={() => dispatch(removeAlert(alert.id))}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{zIndex:"9999"}}
          >
            <Alert
              onClose={() => dispatch(removeAlert(alert.id))}
              severity={alert.alertType} // Predefined severity ('success', 'error', 'warning', etc.)
              sx={{
                width: '100%',
                position: 'relative',
                top: `${10 + alerts.indexOf(alert) * 60}px`,
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                backgroundColor: 
                  alert.alertType === 'success'
                    ? 'green' // Custom color for success
                    : alert.alertType === 'error'
                    ? 'red' // Custom color for error
                    : alert.alertType === 'warning'
                    ? 'yellow' // Custom color for warning
                    : 'blue', // Default color for other alert types
                color: 
                  alert.alertType === 'success'
                    ? 'white'
                    : alert.alertType === 'error'
                    ? 'white'
                    : alert.alertType === 'warning'
                    ? 'black'
                    : 'white', // Adjust text color based on alert type
              }}
            >
              {alert.msg}
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};

export default AlertComponent;
