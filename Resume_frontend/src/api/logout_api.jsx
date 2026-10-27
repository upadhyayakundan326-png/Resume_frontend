const fetchlogoutApi = async () => {
    const response = await fetch(
        "http://localhost:8000/api/auth/logout",
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