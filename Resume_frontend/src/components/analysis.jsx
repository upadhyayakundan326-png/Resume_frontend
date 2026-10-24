
import {
  FileSearch,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

function AnalysisResult({ analysis }) {
  if (!analysis) {
    return null;
  }

  const isProcessing =
    analysis.status === "queued" ||
    analysis.status === "processing";

  return (
    <section className="upload-card analysis-card">
      <div className="section-heading">
        <div>
          <span className="dashboard-eyebrow">STEP 02</span>
          <h2>Resume Analysis</h2>
          <p>AI-powered insights for your selected job.</p>
        </div>

        <div className="section-icon">
          <FileSearch size={24} />
        </div>
      </div>

      {isProcessing && (
        <div className="analysis-status">
          <LoaderCircle size={22} className="spin" />

          <h3>
            {analysis.status === "queued"
              ? "Resume queued for analysis"
              : "Analyzing your resume..."}
          </h3>

          <p>Please wait while the analysis is being processed.</p>
        </div>
      )}

      {analysis.status === "failed" && (
        <div className="analysis-status">
          <AlertCircle size={22} />

          <h3>Analysis failed</h3>

          <p>Please try uploading your resume again.</p>
        </div>
      )}

      {analysis.status === "completed" && (
        <>
          <div className="analysis-score">
            <Sparkles size={22} />

            <h3>Resume Score</h3>

            <p>
              {analysis.score ?? "N/A"}
              {analysis.score !== null &&
              analysis.score !== undefined
                ? "/100"
                : ""}
            </p>
          </div>

          <div className="analysis-summary">
            <h3>Analysis Summary</h3>

            <p>
              {analysis.summary || "No summary available."}
            </p>
          </div>

          <div className="analysis-skills">
            <h3>Skills Found</h3>

            {analysis.skills?.length > 0 ? (
              <ul>
                {analysis.skills.map((skill, index) => (
                  <li key={`${skill}-${index}`}>
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills returned.</p>
            )}
          </div>

          <div className="analysis-improvements">
            <h3>Areas to Improve</h3>

            {analysis.improvements?.length > 0 ? (
              <ul>
                {analysis.improvements.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No improvements returned.</p>
            )}
          </div>

          <p className="analysis-completed">
            <CheckCircle2 size={16} />
            Analysis completed
          </p>
        </>
      )}
    </section>
  );
}

export default AnalysisResult;
