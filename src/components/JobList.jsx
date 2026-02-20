import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onApply, applyingJobId }) => {
  if (!jobs || jobs.length === 0) {
    return <p className="empty-message">No positions available at the moment.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          onApply={onApply}
          isLoading={applyingJobId === job.id}
        />
      ))}
    </div>
  );
};

export default JobList;
