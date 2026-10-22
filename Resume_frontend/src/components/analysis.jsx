
import { Link } from "react-router-dom";
import { FileSearch, FileText } from "lucide-react";

function AnalysisResult({ analysis }) {
  return (
    <section className="analysis-card">
      <div className="section-heading">
        <div>
          <span className="dashboard-eyebrow">STEP 02</span>
          <h2>Analysis Results</h2>
          <p>Your resume score and AI recommendations appear here.</p>
        </div>

        <div className="section-icon results-icon">
          <FileText size={23} />
        </div>
      </div>

      {!analysis ? (
        <div className="empty-results">
          <div className="empty-icon">
            <FileSearch size={28} />
          </div>

          <h3>No analysis yet</h3>
          <p>
            Upload your resume and click Analyse Resume to get started.
          </p>
        </div>
      ) : (
        <div className="analysis-result-content">
          <div className="result-status">
            <span>Analysis Status</span>
            <strong>{analysis.status}</strong>
          </div>

          {analysis.score !== null && (
            <div className="score-section">
              <div className="score-circle">
                <strong>{analysis.score}</strong>
                <span>/100</span>
              </div>

              <div>
                <h3>Resume Score</h3>
                <p>
                  {analysis.score >= 80
                    ? "Great match! Keep refining your resume."
                    : analysis.score >= 60
                      ? "Good start. Check your improvement suggestions."
                      : "Review the recommendations to improve your resume."}
                </p>
              </div>
            </div>
          )}

          {analysis.summary && (
            <div className="result-detail">
              <h3>AI Analysis</h3>
              <p>{analysis.summary}</p>
            </div>
          )}

          {analysis.skills.length > 0 && (
            <div className="result-detail">
              <h3>Detected Skills</h3>
              <div className="skills-list">
                {analysis.skills.map((skill, index) => (
                  <span key={index}>
                    {typeof skill === "string"
                      ? skill
                      : skill.name || JSON.stringify(skill)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analysis.improvements.length > 0 && (
            <div className="result-detail">
              <h3>Recommended Improvements</h3>
              <ul>
                {analysis.improvements.map((item, index) => (
                  <li key={index}>
                    {typeof item === "string"
                      ? item
                      : JSON.stringify(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.status === "queued" && (
            <p className="queued-note">
              Your resume is queued for analysis. The final score may not
              be available yet. Check{" "}
              <Link to="/resumes">My Resumes</Link> for the latest status.
            </p>
          )}

          <Link to="/resumes" className="view-resumes-link">
            View My Resumes
          </Link>
        </div>
      )}
    </section>
  );
}

export default AnalysisResult;
