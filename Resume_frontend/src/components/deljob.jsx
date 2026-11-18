
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteSavedJobAPI } from "../api/deljobapi";

const SavedJobs = ({ initialJobs = [] }) => {

    const [savedJobs, setSavedJobs] = useState(initialJobs);
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (jobId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this saved job?"
        );

        if (!confirmDelete) return;

        try {
            setDeletingId(jobId);

            const data = await deleteSavedJobAPI(jobId);

            if (data.success) {
                setSavedJobs((prev) =>
                    prev.filter((job) => job._id !== jobId)
                );
            }

        } catch (error) {
            console.log(error);
            alert(error.message);

        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Saved Jobs
            </h1>

            {savedJobs.length === 0 ? (

                <p className="text-gray-500">
                    No saved jobs found.
                </p>

            ) : (

                <div className="grid gap-4">

                    {savedJobs.map((job) => (

                        <div
                            key={job._id}
                            className="border rounded-xl p-4 flex justify-between items-center"
                        >

                            <div>
                                <h2 className="font-semibold text-lg">
                                    {job.title}
                                </h2>

                                <p className="text-gray-500">
                                    {job.company}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(job._id)}
                                disabled={deletingId === job._id}
                                className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 disabled:opacity-50"
                            >
                                <Trash2 size={17} />

                                {deletingId === job._id
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default SavedJobs;
