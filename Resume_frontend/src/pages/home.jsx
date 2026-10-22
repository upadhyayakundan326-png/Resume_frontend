import { useNavigate } from "react-router-dom";
import {
  Target,
  BrainCircuit,
  Code2,
  BriefcaseBusiness,
  UploadCloud,
  Search,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Resume Scoring",
      description:
        "Get a score out of 100 and know where you stand.",
      color: "blue",
    },
    {
      icon: BrainCircuit,
      title: "AI Feedback",
      description:
        "Find areas to improve with smart suggestions.",
      color: "purple",
    },
    {
      icon: Code2,
      title: "Skills Analysis",
      description:
        "See skills detected in your resume.",
      color: "green",
    },
    {
      icon: BriefcaseBusiness,
      title: "Job Matching",
      description:
        "Compare your resume against job requirements.",
      color: "orange",
    },
  ];

  const steps = [
    {
      icon: UploadCloud,
      title: "1. Upload",
      description: "Upload your resume (PDF/DOC).",
    },
    {
      icon: Search,
      title: "2. Analyse",
      description: "Our AI analyses your resume.",
    },
    {
      icon: Lightbulb,
      title: "3. Improve",
      description: "Get scores, insights and suggestions.",
    },
  ];

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={15} />
            AI-Powered Resume Analyser
          </div>

          <h1>
            Make Your Resume
            <span>Stand Out</span>
          </h1>

          <p className="hero-description">
            Upload your resume, discover your strengths,
            identify skill gaps and get AI-powered
            suggestions to improve it.
          </p>

          <button
            className="analyse-button"
            onClick={() => navigate("/login")}
          >
            <UploadCloud size={20} />
            Analyse My Resume
            <ArrowRight size={19} />
          </button>

          <p className="login-note">
            Login required to upload and save your analysis.
          </p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-glow"></div>
          <div className="score-circle">
            <div className="score-ring">
              <span className="score-number">85</span>
              <span className="score-total">/100</span>
            </div>
          </div>
          <div className="floating-spark spark-one"></div>
          <div className="floating-spark spark-two"></div>
          <div className="floating-spark spark-three"></div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <h2>Powerful Features</h2>
          <p>
            Everything you need to build a stronger resume
            and get noticed.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                className="feature-card"
                key={feature.title}
              >
                <div className={`feature-icon ${feature.color}`}>
                  <Icon size={29} strokeWidth={2.2} />
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="steps-section" id="how-it-works">
        <div className="section-heading">
          <h2>How It Works</h2>
          <p>Just 3 simple steps to improve your resume.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="step-item" key={step.title}>
                <div
                  className={`step-icon step-${index + 1}`}
                >
                  <Icon size={35} strokeWidth={2} />
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Home;