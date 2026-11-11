
const API = import.meta.env.VITE_API_URL
const Profile = async()=>{
    const response = await fetch(
        `${API}/api/dashboard/dash`
        ,{
        method:"GET",
        credentials:"include"
    })

     const data = await response.json();
     

    if (!response.ok) {
    throw new Error(
        data.message || "Failed to fetch dashboard stats"
    );
}
    return data.result;
}
export default Profile