import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileSearch,
  Files,
  BriefcaseBusiness,
  UserRound,
  BrainCircuit
} from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <BrainCircuit size={24} />
        </div>

        <div>
          <h2>Resume Analyzer</h2>
          <p>AI-Powered Insights</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/analyzer" className="sidebar-link">
          <FileSearch size={19} />
          <span>Resume Analyzer</span>
        </NavLink>

        <NavLink to="/resumes" className="sidebar-link">
          <Files size={19} />
          <span>My Resumes</span>
        </NavLink>

        <NavLink to="/jobs" className="sidebar-link">
          <BriefcaseBusiness size={19} />
          <span>Jobs</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          <UserRound size={19} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-status-dot" />
        AI Workspace
      </div>
    </aside>
  );
}

export default Sidebar;