export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRepoUrl = (url) => {
  if (!url || url.trim() === "") {
    return "Repository URL is required.";
  }
  const githubRepoRegex =
    /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+$/;
  if (!githubRepoRegex.test(url)) {
    return "Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo).";
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};
