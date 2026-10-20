
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Otp from "./pages/otp";
import "./App.css";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
