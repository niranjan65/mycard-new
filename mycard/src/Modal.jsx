import React from 'react';

const Modal = ({ visible, onClose, title, message, type }) => {
  if (!visible) return null;

  const backgroundColors = {
    success: '#D1FAE5', // light green
    error: '#FEE2E2', // light red
  };

  const borderColors = {
    success: '#10B981', // green
    error: '#EF4444', // red
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '400px',
          width: '90%',
          padding: '20px',
          backgroundColor: backgroundColors[type] || 'white',
          borderRadius: '8px',
          border: `2px solid ${borderColors[type] || 'black'}`,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ color: borderColors[type], marginBottom: '10px' }}>{title}</h2>
        <p style={{ fontSize: '14px', marginBottom: '20px', color: '#333' }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            cursor: 'pointer',
            backgroundColor: borderColors[type],
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
