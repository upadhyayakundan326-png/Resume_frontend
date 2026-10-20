import {useNavigate}from "react-router-dom" 
import {useState} from "react" 
import "./otp.css"

function Otp(){
    const API_URL= "http://localhost:8000/api/auth/verify"

    const [otp,setotp]=useState(null)
        const [email,setemail]=useState("")

    const handleVerify=async(e)=>{
        e.preventDefault();

        
        
            try{
      const response = await fetch(API_URL,{
         method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({email,otp})
      })
      const data = await response.json();
      if(!response.ok){
        alert(data.message||"otp is not sent to the device")
        return
      }
      alert(data.message||"congratulations you just login to the app")

    }
    catch(error){
        console.log(error)
        alert(error||"could not connect to the server")
        return
    }
}
return(
     <div className="otp-container">
      <div className="otp-card">
        <h1>Verify OTP</h1>
        <p>Enter your email and the OTP sent to you.</p>

        <form onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            required
          />

          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
)
}
export default Otp
