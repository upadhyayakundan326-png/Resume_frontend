import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import {
  FileUser,
  UserRound,
  Mail,
  LockKeyhole,
  ReceiptPoundSterling,
} from "lucide-react";

function Signup(){
    const API_URL = "http://localhost:8000/api/auth/signup"

    const navigate = useNavigate();
    
    const[formdata,setformdata]=useState({
        userName:"",
        email:"",
        password:""
    })
     const [message, setMessage] = useState("");
  //const [loading, setLoading] = useState(false);


    function handleChange(e){
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    
     const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log("button clicked")
    try{
      const response = await fetch(API_URL,{
         method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formdata),
      })

      const data = await response.json();
      if(!response.ok){
        console.log("unsuccesful")
        alert(data.message||"signup unsuccesfull");
        ReceiptPoundSterling
        return
      }
      alert(data.message||"signup succesfull,check email for your otp")
    console.log("succesfull")
    navigate("/otp")
    }
    catch(error){
        console.log("server issue")
       alert(error.message||"could not connect to the server") 
       return
    }
     }
     return(
          <main className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-heading">
          <div className="signup-logo">
            <FileUser size={38} strokeWidth={1.8} />
          </div>

          <h1>Create Account</h1>
          <p>Sign up for Resume Analyser</p>
        </div>

        <label htmlFor="userName">Username</label>
        <div className="input-group">
          <UserRound size={21} />
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="Enter your username"
            value={formdata.userName}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="email">Email</label>
        <div className="input-group">
          <Mail size={21} />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-group">
          <LockKeyhole size={21} />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Account</button>
        <div className="login">
        <p className="signup-footer">
  Already have an account?{" "}
  <span onClick={() => navigate("/login")}>
    Login
  </span>
</p>
</div>
        {message && (
          <p className="signup-message" role="status">
            {message}
          </p>
          
        )}
      </form>
    </main>
     )
    }
    export default Signup
