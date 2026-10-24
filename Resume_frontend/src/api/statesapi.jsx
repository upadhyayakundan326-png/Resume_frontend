
export async function fetchResumeStatusApi(resumeId) {
  const response = await fetch(
    `http://localhost:8000/api/states/getStates/${resumeId}`,
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