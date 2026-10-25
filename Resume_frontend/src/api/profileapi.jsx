const API_URL  =  "http://localhost:8000/api/dashboard/dash"

const Profile = async()=>{
    const response = await fetch(API_URL,{
        method:"GET",
        credentials:include
    })

     const data = await response.json();

    if(!response.ok){
        return res.status(400).json({
            message:data.messsage||"failed to fetch"
        })
       
    }
    return data;
}
export default Profile