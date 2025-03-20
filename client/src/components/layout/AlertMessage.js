// src/components/layout/AlertMessage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast, ToastContainer } from 'react-bootstrap';
import { removeAlert } from '../../store/slices/uiSlice';

const AlertMessage = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.ui);

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeAlert(alerts[0].id));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [alerts, dispatch]);

  return (
    <ToastContainer position="top-end" className="p-3">
      {alerts.map((alert) => (
        <Toast 
          key={alert.id} 
          bg={alert.type} 
          onClose={() => dispatch(removeAlert(alert.id))}
        >
          <Toast.Header>
            <strong className="me-auto">{alert.title || 'Notification'}</strong>
          </Toast.Header>
          <Toast.Body className={alert.type === 'danger' || alert.type === 'dark' ? 'text-white' : ''}>
            {alert.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default AlertMessage;