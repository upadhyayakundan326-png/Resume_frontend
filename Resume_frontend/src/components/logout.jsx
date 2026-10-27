import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import fetchlogoutApi from "../api/logout_api";
import Sidebar from "../sidebar/sidebar";
import "./logout.css"

function Logout() {

    const navigate = useNavigate();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {

        try {
            setLoading(true);

            await fetchlogoutApi();

            navigate("/login");

        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="sidebar">

      

            <div className="sidebar-logout">

                {!showLogoutConfirm ? (

                    <button
                        className="logout-btn"
                        onClick={() => setShowLogoutConfirm(true)}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>

                ) : (

                    <div className="logout-confirm">

                        <p>Are you sure you want to logout?</p>

                        <div className="logout-confirm-actions">

                            <button
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                {loading ? "Logging out..." : "Yes, Logout"}
                            </button>

                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </aside>
    );
}

export default Logout;