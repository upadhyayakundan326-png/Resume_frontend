
export async function uploadResumeApi(resume, selectedJobId) {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobId", selectedJobId);

  const response = await fetch(
    "http://localhost:8000/api/resume/upload",
    {
      method: "POST",
      credentials: "include",
      body: formData
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Resume upload failed");
  }

  return data;
}
export default uploadResumeApi
