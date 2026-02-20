import { API_ENDPOINTS } from "../utils/apiTypes";
import { parseErrorMessage } from "../utils/errorUtils";

const BASE_URL_ENV =
  process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "";
const BASE_URL = BASE_URL_ENV.endsWith("/") ? BASE_URL_ENV : `${BASE_URL_ENV}/`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }
  return response.json();
};

export const apiService = {
  getCandidateByEmail: async (email) => {
    const url = `${BASE_URL}${API_ENDPOINTS.GET_CANDIDATE}?email=${encodeURIComponent(email)}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  getJobs: async () => {
    const url = `${BASE_URL}${API_ENDPOINTS.GET_JOBS}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  applyToJob: async (data) => {
    const url = `${BASE_URL}${API_ENDPOINTS.APPLY}`;
    const payload = {
      uuid: data.uuid,
      jobId: String(data.jobId),
      candidateId: data.candidateId,
      applicationId: data.applicationId,
      repoUrl: data.repoUrl,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },
};
