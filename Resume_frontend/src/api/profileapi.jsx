const API_URL  =  "http://localhost:8000/api/dashboard/dash"

const Profile = async()=>{
    const response = await fetch(API_URL,{
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