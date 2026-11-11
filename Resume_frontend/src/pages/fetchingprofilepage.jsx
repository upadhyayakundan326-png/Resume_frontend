
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "./fetch.css"
    const API = import.meta.env.VITE_API_URL
function Fetching(){
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchprofile = async()=>{
        try{
        const response = await fetch(`${API}/api/getprofile/profile`,{
            method :"GET",
            credentials:"include"
        })
        console.log("Response status:", response.status);
        const data = await response.json()
        console.log("Backend response:", data);
        if(!response.ok){
             alert("Login failed")
            navigate("/login")
            return
        }
        navigate("/analyse")


    }
    catch(error){
        navigate("/login")
        
    }

    }
    
    fetchprofile()
  },[navigate])





    return(
        <div className="fetching">

            <h1>Fetching your profile...</h1>

            <p>Please wait while we load your account.</p>

        </div>

    )
}
export default  Fetching