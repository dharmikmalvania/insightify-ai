import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <Layout>
        <div className="result-container">
          <h2>No analysis data found.</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="result-container">

        <div className="result-hero">
          <h2>{data.title || "AI Analysis"}</h2>
          <div className="result-tags">
            <span className="result-tag">
              {data.category || "Generated"}
            </span>
            <span className="result-tag">
              Confidence: {data.confidence || "AI"}
            </span>
          </div>
        </div>

        <div className="result-card">
          <h3>Professional Summary</h3>
          <p className="result-summary">{data.summary}</p>
        </div>

         <div className="result-card">
  <h3>Related Images</h3>
  <img
    src={`https://source.unsplash.com/800x400/?${data.title}`}
    alt="Related"
    style={{ width: "100%", borderRadius: "12px" }}
  />
</div>

<div className="result-card">
  <h3>Purchase Options</h3>
  <a
    href={`https://www.amazon.in/s?k=${data.title}`}
    target="_blank"
    rel="noreferrer"
    className="result-btn btn-primary"
  >
    Buy on Amazon
  </a>
</div>

        <div className="result-card">
          <h3>Estimated Price</h3>
          <p>{data.estimatedPrice || "AI Estimated"}</p>
        </div>

        {data.features && data.features.length > 0 && (
          <div className="result-card">
            <h3>Key Features</h3>
            <div className="result-features">
              {data.features.map((feature, index) => (
                <div key={index} className="feature-box">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="result-actions">
          <button
            className="result-btn btn-primary"
            onClick={() => navigate("/upload")}
          >
            Re-Analyze
          </button>

          <button
            className="result-btn btn-secondary"
            onClick={() =>
              navigator.clipboard.writeText(data.summary)
            }
          >
            Copy Summary
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default Result;
