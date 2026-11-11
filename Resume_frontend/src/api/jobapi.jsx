
const API = import.meta.env.VITE_API_URL
export async function fetchJobsApi() {
  const response = await fetch(
    `${API}/api/job`,
    {
      credentials: "include"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load jobs");
  }

  return data.jobs || [];
}
export default fetchJobsApi