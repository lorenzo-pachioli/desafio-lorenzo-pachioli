import React, { useState } from 'react';
import { validateRepoUrl } from '../utils/validationUtils';

const JobItem = ({ job, onApply, isLoading }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(job.id, repoUrl);
  };

  return (
    <div className="job-item">
      <h3>{job.title}</h3>
      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="text"
          placeholder="Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={isLoading}
          className="input"
        />
        <button
          type="submit"
          disabled={isLoading || !!validateRepoUrl(repoUrl)}
          className="button primary"
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JobItem;
