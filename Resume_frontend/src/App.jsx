
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Otp from "./pages/otp";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
  );
}

export default App;
