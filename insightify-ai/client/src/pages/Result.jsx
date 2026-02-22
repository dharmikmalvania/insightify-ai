import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [darkMode, setDarkMode] = useState(true);

  if (!data) {
    return (
      <Layout>
        <div className="result-container">
          <h2>No analysis data found.</h2>
        </div>
      </Layout>
    );
  }

  const confidenceValue = parseInt(data.confidence) || 70;

  const marketScore = Math.min(
    95,
    Math.max(60, (data.summary?.length || 100) % 100)
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(data.summary);
    alert("Summary copied!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: data.summary,
      });
    }
  };

  return (
    <Layout>
      <div className={`result-container ${darkMode ? "dark" : "light"}`}>

        {/* Dark Mode Toggle */}
        <div className="toggle-wrapper">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        {/* Hero Section */}
        <div className="result-hero">
          <h1>{data.title}</h1>
          <span className="category-badge">{data.category}</span>
        </div>

        {/* Confidence Bar */}
        <div className="confidence-wrapper">
          <div>Confidence: {confidenceValue}%</div>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${confidenceValue}%` }}
            ></div>
          </div>
        </div>

        {/* AI Strategic Insight */}
        <div className="insight-highlight">
          <h2>AI Strategic Insight</h2>
          <p>{data.marketPosition?.competitiveAdvantage}</p>
        </div>

        {/* Market Intelligence Score */}
        <div className="result-section">
          <h2>Market Intelligence Score</h2>
          <div
            className="score-circle"
            style={{
              background: `conic-gradient(#6366f1 ${marketScore}%, #e5e7eb 0%)`
            }}
          >
            {marketScore}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="result-section">
          <h2>Professional Summary</h2>
          <p>{data.summary}</p>
        </div>

        {/* Pros vs Cons */}
        <div className="pros-cons-wrapper">

          <div className="pros-box">
            <h3>Pros</h3>
            <ul>
              {data.pros?.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>
          </div>

          <div className="cons-box">
            <h3>Cons</h3>
            <ul>
              {data.cons?.map((item, i) => (
                <li key={i}>⚠ {item}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Target Audience */}
        <div className="result-section">
          <h2>Target Audience</h2>
          <p><strong>Primary:</strong> {data.targetAudience?.primary}</p>
          <p><strong>Secondary:</strong> {data.targetAudience?.secondary}</p>
          <p><strong>Demographics:</strong> {data.targetAudience?.demographics}</p>
          <p><strong>Behavioral Profile:</strong> {data.targetAudience?.behavioralProfile}</p>
        </div>

        {/* Market Position */}
        <div className="result-section">
          <h2>Market Position</h2>
          <p><strong>Price Tier:</strong> {data.marketPosition?.priceTier}</p>
          <p><strong>Brand Strength:</strong> {data.marketPosition?.brandStrength}</p>
          <p><strong>Competitive Advantage:</strong> {data.marketPosition?.competitiveAdvantage}</p>
          <p><strong>Growth Potential:</strong> {data.marketPosition?.growthPotential}</p>
        </div>

        {/* Related Images */}
        {data.relatedImages?.length > 0 && (
          <div className="result-section">
            <h2>Related Images</h2>
            <div className="image-grid">
              {data.relatedImages.map((img, index) => (
                <img key={index} src={img} alt="" className="grid-image" />
              ))}
            </div>
          </div>
        )}

        {/* Amazon */}
        <div className="result-section center">
          <h2>Purchase Options</h2>
          <a
            href={`https://www.amazon.in/s?k=${encodeURIComponent(data.title)}`}
            target="_blank"
            rel="noreferrer"
            className="action-btn"
          >
            View on Amazon
          </a>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="action-btn" onClick={() => navigate("/")}>
            Re-Analyze
          </button>

          <button className="action-btn" onClick={handleCopy}>
            Copy Summary
          </button>

          <button className="action-btn" onClick={handleShare}>
            Share
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default Result;