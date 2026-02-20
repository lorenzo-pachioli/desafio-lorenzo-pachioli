export const parseErrorMessage = async (response) => {
  try {
    const data = await response.json();
    return (
      data.message ||
      data.error ||
      "Check the information provided and try again."
    );
  } catch {
    return "Check the information provided and try again.";
  }
};

export const getNetworkErrorMessage = (error) => {
  return "Network error. Please check your internet connection.";
};
