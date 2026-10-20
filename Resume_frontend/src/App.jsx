
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Otp from "./pages/otp";
import "./App.css";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot_pass";
import ResetPassword from "./pages/reset_pass";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

<Route
    path="/reset-password"
    element={<ResetPassword />}
/>
      
    </Routes>
  );
}

export default App;
