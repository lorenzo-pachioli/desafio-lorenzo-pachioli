import React from 'react';

const SuccessModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content success">
        <h2>Success</h2>
        <p>{message}</p>
        <button onClick={onClose} className="button primary">
          Great!
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
