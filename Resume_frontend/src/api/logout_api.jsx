
const API = import.meta.env.VITE_API_URL
const fetchlogoutApi = async () => {
    const response = await fetch(
       `${API}/api/auth/logout`,
        {
            method: "POST",
            credentials: "include"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;
};

export default fetchlogoutApi;