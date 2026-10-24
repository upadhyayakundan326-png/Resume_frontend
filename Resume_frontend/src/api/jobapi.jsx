
export async function fetchJobsApi() {
  const response = await fetch(
    "http://localhost:8000/api/job",
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