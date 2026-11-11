

  const API = import.meta.env.VITE_API_URL
const DeleteResumeApi = async (resumeId) => {
    const response = await fetch(
        `${API}/api/delete/del/${resumeId}`,
        {
            method: "DELETE",
            credentials: "include"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete resume");
    }

    return data;
};

export { DeleteResumeApi };
