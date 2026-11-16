
const API = import.meta.env.VITE_API_URL;

export const getAllResumes = async (page = 1, limit = 10) => {
    const response = await fetch(
        `${API}/api/getresume/getresumes?page=${page}&limit=${limit}`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    const text = await response.text();

    console.log("API STATUS:", response.status);
    console.log("API RESPONSE:", text);

    let data;

    try {
        data = JSON.parse(text);
    } catch (error) {
        throw new Error(
            `Backend returned invalid JSON: ${text.slice(0, 200)}`
        );
    }

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch resumes");
    }

    return data;
};
