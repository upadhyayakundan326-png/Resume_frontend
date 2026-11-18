
const API_URL = import.meta.env.VITE_API_URL;

export const deleteSavedJobAPI = async (jobId) => {
    const response = await fetch(
        `${API_URL}/api/job/saved/${jobId}`,
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete saved job");
    }

    return data;
};
