import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { validateRepoUrl } from '../utils/validationUtils';
import JobList from '../components/JobList';
import Loader from '../components/Loader';
import ErrorModal from '../components/ErrorModal';
import CandidateEntry from '../components/CandidateEntry';
import SuccessModal from '../components/SuccessModal';

const JobsPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchData = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      const candidateData = await apiService.getCandidateByEmail(email);
      setCandidate(candidateData);

      const jobsData = await apiService.getJobs();
      setJobs(jobsData);
    } catch (err) {
      setError(err.message);
      setUserEmail('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchData(userEmail);
    }
  }, [userEmail, fetchData]);

  const handleApply = async (jobId, repoUrl) => {
    const validationError = validateRepoUrl(repoUrl);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!candidate) {
      setError('Candidate information not loaded. Please refresh.');
      return;
    }

    setApplyingJobId(jobId);
    setError(null);

    try {
      await apiService.applyToJob({
        uuid: candidate.uuid,
        jobId: String(jobId),
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl.trim(),
      });
      setSuccessMessage('Application sent successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setApplyingJobId(null);
    }
  };

  if (!userEmail && !candidate) {
    return (
        <div className="container">
            <CandidateEntry onEnter={setUserEmail} />
            <ErrorModal message={error} onClose={() => setError(null)} />
        </div>
    );
  }

  if (isLoading && !candidate) {
    return <Loader />;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Available Positions</h1>
        {candidate && (
          <p className="candidate-info">
            Welcome, <strong>{candidate.firstName} {candidate.lastName}</strong>
          </p>
        )}
      </header>

      <main>
        <JobList 
          jobs={jobs} 
          onApply={handleApply} 
          applyingJobId={applyingJobId} 
        />
      </main>

      <ErrorModal message={error} onClose={() => setError(null)} />
      <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />
      
      {isLoading && <Loader />}
    </div>
  );
};

export default JobsPage;
