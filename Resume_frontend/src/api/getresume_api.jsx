

const API_URL = "http://localhost:8000/api/getresume/getresumes";

export const getAllResumes = async (page = 1, limit = 10) => {
    const response = await fetch(
        `${API_URL}?page=${page}&limit=${limit}`,
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