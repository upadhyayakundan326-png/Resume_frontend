
import { useState } from "react";
import { BriefcaseBusiness, Plus, CheckCircle } from "lucide-react";
import "./job.css";

function Jobs() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        requiredSkills: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError(false);

        try {
            const response = await fetch(
                "http://localhost:8000/api/job/create",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        company: formData.company,
                        description: formData.description,
                        requiredSkills: formData.requiredSkills
                            .split(",")
                            .map(skill => skill.trim())
                            .filter(skill => skill !== "")
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save job");
            }

            setMessage("Job saved successfully!");
            setFormData({
                title: "",
                company: "",
                description: "",
                requiredSkills: ""
            });

        } catch (err) {
            setError(true);
            setMessage(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="jobs-page">
            <div className="jobs-heading">
                <div className="jobs-heading-icon">
                    <BriefcaseBusiness size={25} />
                </div>

                <div>
                    <h1>Jobs</h1>
                    <p>Save a job description to analyse your resume against it.</p>
                </div>
            </div>

            <form className="jobs-form" onSubmit={handleSubmit}>
                <h2>Create a Job</h2>
                <p className="jobs-form-subtitle">
                    Add the role requirements you want to match your resume with.
                </p>

                <label htmlFor="title">Job Title</label>
                <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    required
                />

                <label htmlFor="company">Company Name</label>
                <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. ABC Technologies"
                    required
                />

                <label htmlFor="description">Job Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Paste the complete job description here..."
                    rows={7}
                    required
                />

                <label htmlFor="requiredSkills">
                    Required Skills
                </label>
                <input
                    id="requiredSkills"
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Node.js"
                />

                {message && (
                    <p className={error ? "jobs-error" : "jobs-success"}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className="save-job-button"
                    disabled={loading}
                >
                    {loading ? (
                        "Saving..."
                    ) : (
                        <>
                            <Plus size={18} />
                            Save Job
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default Jobs;
