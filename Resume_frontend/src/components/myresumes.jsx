import { useEffect, useState } from "react";
import { getAllResumes } from "../api/getresume_api";
import Sidebar from "../sidebar/sidebar"
import "./resume.css"
 import { DeleteResumeApi } from "../api/delteapi"; 
 import { Trash2 } from "lucide-react";

function MyResumes() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    


    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const data = await getAllResumes();
                setResumes(data.resumes || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    if (loading) return <p>Loading resumes...</p>;
    if (error) return <p>{error}</p>;

    const handleDelete = async (resumeId) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
        const data = await DeleteResumeApi(resumeId);

        if (data.success) {
            setResumes((prev) =>
                prev.filter((item) => item._id !== resumeId)
            );
        } else {
            alert(data.message);
        }
    } catch (error) {
          console.error("DELETE ERROR:", error);
        console.log(error);
    }
};

    return(
        <div className="my-resumes-layout">
            <Sidebar />

            <main className="my-resumes-main">
                <header className="my-resumes-header">
                    <div>
                        <p className="my-resumes-label">
                            YOUR WORKSPACE
                        </p>
                        <h1>My Resumes</h1>
                        <p className="my-resumes-subtitle">
                            Manage and review your uploaded resumes.
                        </p>
                    </div>

                    <div className="resume-count">
                        <span>{resumes.length}</span>
                        <p>Resumes</p>
                    </div>
                </header>

                {loading ? (
                    <p className="resume-message">
                        Loading resumes...
                    </p>
                ) : error ? (
                    <p className="resume-message error">
                        {error}
                    </p>
                ) : resumes.length === 0 ? (
                    <div className="empty-resumes">
                        <div className="empty-icon">📄</div>
                        <h2>No resumes yet</h2>
                        <p>
                            Your uploaded resumes will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="resume-grid">
                        {resumes.map((item) => (
                            <article
                                className="resume-card"
                                key={item._id}
                            >
                                <div className="resume-card-top">
                                    <div className="resume-file-icon">
                                        PDF
                                    </div>

                                    <span
                                        className={`resume-status ${
                                            item.status || "queued"
                                        }`}
                                    >
                                        {item.status || "queued"}
                                    </span>
                                      <button
            className="delete-resume-btn"
            onClick={() => handleDelete(item._id)}
            title="Delete resume"
        >
            <Trash2 size={18} />
        </button>
                                </div>

                                <h2 title={item.resumeName}>
                                    {item.resumeName || "Untitled Resume"}
                                </h2>

                                <p className="resume-date">
                                    Uploaded{" "}
                                    {item.createdAt
                                        ? new Date(
                                              item.createdAt
                                          ).toLocaleDateString()
                                        : "Date unavailable"}
                                </p>

                                <div className="resume-score-section">
                                    <div>
                                        <p>Resume Score</p>
                                        <strong>
                                            {item.status === "completed"
                      //nulish qualiscience operetor is use
                                       ? `${item.score ?? 0}/100`
                                                : "--/100"}
                                        </strong>
                                    </div>

                                    <div className="score-track">
                                        <div
                                            className="score-fill"
                                            style={{
                                                width: `${
                                                    item.status === "completed"
                                                        ? Math.min(
                                                              100,
                                                              Math.max(
                                                                  0,
                                                                  Number(item.score) || 0
                                                              )
                                                          )
                                                        : 0
                                                }%`
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="resume-card-footer">
                                    <span>
                                        {item.status === "completed"
                                            ? "Analysis complete"
                                            : item.status === "failed"
                                            ? "Analysis failed"
                                            : "Analysis in progress"}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}


export default MyResumes;