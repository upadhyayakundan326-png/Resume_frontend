    const API = import.meta.env.VITE_API_URL
export async function fetchResumeStatusApi(resumeId) {
  const response = await fetch(
    `${API}/api/states/getStates/${resumeId}`,
    {
      credentials: "include"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to get resume status"
    );
  }

  return data;
}
export default fetchResumeStatusApi