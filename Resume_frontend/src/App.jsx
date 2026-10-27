
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Otp from "./pages/otp";
import "./App.css";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot_pass";
import ResetPassword from "./pages/reset_pass";
import Home from "./pages/home";
import Dashboard from "./components/analyzer";
import Jobs from "./pages/job";
import MyResumes from "./components/myresumes";
import ProfileStats from "./components/profile";
import Logout from "./components/logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
       <Route path="/analyse" element={<Dashboard />} />
       <Route path="/jobs" element={<Jobs />} />
       <Route path="/resumes" element={<MyResumes />} />
      

      <Route path="/forgot-password"
    element={<ForgotPassword />}
/>

 <Route
    path="/reset-password"
    element={<ResetPassword />}
  />
  <Route path="/profile" element={<ProfileStats />} />
        

        <Route path="/logout" element={<Logout/>} />
      
    
    </Routes>

  );
}

export default App;
