

const API = import.meta.env.VITE_API_URL

export const getAllResumes = async (page = 1, limit = 10) => {
    const response = await fetch(
        `${API}?page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch resumes");
    }

    return data;
};