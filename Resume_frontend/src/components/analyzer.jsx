
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  FileSearch,
  Upload,
  Sparkles,
  BriefcaseBusiness,
  LoaderCircle,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import Sidebar from "../sidebar/sidebar";
import AnalysisResult from "./analysis";
import { fetchJobsApi } from "../api/jobapi";
import { uploadResumeApi } from "../api/uploadapi";
import { fetchResumeStatusApi } from "../api/statesapi";
import "./analyzer.css";

function Dashboard() {
  const [resume, setResume] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [jobsLoading, setJobsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const pollingRef = useRef(null);

  // 1. JOBS API
  async function loadJobs() {
    setJobsLoading(true);

    try {
      const jobsData = await fetchJobsApi();
      setJobs(jobsData);
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setJobsLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();

    return () => {
      clearTimeout(pollingRef.current);
    };
  }, []);

  // Resume file validation
  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a PDF, JPG, PNG or WEBP file.");
      setMessageType("error");
      setResume(null);
      e.target.value = "";
      return;
    }

    setResume(file);
    setAnalysis(null);
    setMessage("");
    setMessageType("");
  }

  // 3. STATES API POLLING
  async function pollResumeStatus(resumeId) {
    clearTimeout(pollingRef.current);

    async function checkStatus() {
      try {
        const data = await fetchResumeStatusApi(resumeId);

        setAnalysis((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            status: data.status,
            score: data.score ?? null,
            summary: data.analysis || "",
            skills: data.skills || [],
            improvements: data.improvement || []
          };
        });

        if (
          data.status === "completed" ||
          data.status === "failed"
        ) {
          pollingRef.current = null;
          return;
        }
      } catch (error) {
        console.error("Polling error:", error);
      }

      pollingRef.current = setTimeout(checkStatus, 2000);
    }

    await checkStatus();
  }

  // 2. UPLOAD API
  async function handleAnalyse(e) {
    e.preventDefault();

    if (!selectedJobId || !resume) {
      setMessage("Please select a job and upload your resume.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");
    setAnalysis(null);

    clearTimeout(pollingRef.current);
    pollingRef.current = null;

    try {
      const data = await uploadResumeApi(resume, selectedJobId);

      const resumeId = data.resume?._id;

      setAnalysis({
        resumeId,
        status: data.status || "queued",
        score: data.resume?.score ?? null,
        summary: data.resume?.analysis || "",
        skills: data.resume?.skills || [],
        improvements: data.resume?.improvement || []
      });

      if (resumeId) {
        pollResumeStatus(resumeId);
      }

      setMessage(data.message || "Resume submitted successfully.");
      setMessageType("success");

      setResume(null);

      const input = document.getElementById("resumeFile");

      if (input) {
        input.value = "";
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              YOUR CAREER WORKSPACE
            </span>

            <h1>
              Resume <span>Analyzer</span>
            </h1>

            <p>
              Upload and analyze your resume with AI-powered insights.
            </p>
          </div>

          <button
            type="button"
            className="refresh-jobs-btn"
            onClick={loadJobs}
            disabled={jobsLoading}
          >
            <RefreshCw size={15} />
            Refresh Jobs
          </button>
        </header>

        <section className="upload-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">STEP 01</span>
              <h2>Upload your resume</h2>
              <p>
                Choose a target job to compare your resume against.
              </p>
            </div>

            <div className="section-icon">
              <FileSearch size={24} />
            </div>
          </div>

          <form onSubmit={handleAnalyse}>
            <div className="form-group">
              <label htmlFor="jobId">
                <BriefcaseBusiness size={16} />
                Target Job
              </label>

              <select
                id="jobId"
                value={selectedJobId}
                onChange={(e) => {
                  setSelectedJobId(e.target.value);
                  setAnalysis(null);
                }}
                disabled={jobsLoading || loading}
                required
              >
                <option value="">
                  {jobsLoading ? "Loading jobs..." : "Select a saved job"}
                </option>

                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title} — {job.company}
                  </option>
                ))}
              </select>

              {!jobsLoading && jobs.length === 0 && (
                <p className="helper-text">
                  No saved jobs yet. <Link to="/jobs">Create a job first</Link>
                </p>
              )}
            </div>

            <label className="resume-dropzone" htmlFor="resumeFile">
              <input
                id="resumeFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
                disabled={loading}
                hidden
              />

              <div className="upload-icon">
                <Upload size={27} />
              </div>

              <h3>{resume ? resume.name : "Upload Resume"}</h3>

              <p>
                {resume
                  ? "Your file is ready for analysis"
                  : "Click here to browse and select your resume"}
              </p>

              <span className="file-types">
                Supports PDF, JPG, PNG and WEBP
              </span>

              <span className="choose-file-btn">
                {resume ? "Choose Another File" : "Choose File"}
              </span>
            </label>

            {message && (
              <div className={`dashboard-message ${messageType}`}>
                {messageType === "error" ? (
                  <AlertCircle size={17} />
                ) : (
                  <CheckCircle2 size={17} />
                )}
                <span>{message}</span>
              </div>
            )}

            <div className="upload-footer">
              <span className="privacy-note">
                <CheckCircle2 size={15} />
                Ready for AI review
              </span>

              <button
                type="submit"
                className="analyse-button"
                disabled={loading || jobsLoading || jobs.length === 0}
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Analyse Resume
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Props pass karke analysis UI dikhana */}
        <AnalysisResult analysis={analysis} />
      </main>
    </div>
  );
}

export default Dashboard;
