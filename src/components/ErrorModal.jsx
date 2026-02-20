import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose} className="button primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
