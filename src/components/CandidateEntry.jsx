import React, { useState } from 'react';
import { validateEmail } from '../utils/validationUtils';

const CandidateEntry = ({ onEnter }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    onEnter(email.trim());
  };

  return (
    <div className="candidate-entry">
      <div className="card">
        <h2>Welcome to the Job Portal</h2>
        <p>Please enter your email to continue</p>
        <form onSubmit={handleSubmit} className="entry-form">
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className={`input ${error ? 'error' : ''}`}
          />
          {error && <p className="error-message">{error}</p>}
          <button 
            type="submit" 
            className="button primary full-width"
            disabled={!!validateEmail(email)}
          >
            Check Candidate Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateEntry;
