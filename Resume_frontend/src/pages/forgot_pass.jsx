
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./forgot.css"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:8000/api/changepass/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ email })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Request failed");
            }

            alert(data.message);

            navigate(
                `/reset-password?email=${encodeURIComponent(email)}`
            );

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Forgot Password?</h2>
                <p>Enter your registered email to receive an OTP.</p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {message && <p>{message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>

                <p>
                    Remember your password? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPassword;
