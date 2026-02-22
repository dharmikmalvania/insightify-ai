import { useState } from "react";
import Layout from "../components/Layout";
import { analyzeContent } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/upload.css";

const Upload = () => {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [userDescription, setUserDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
  if (!text && !link && !image) {
    alert("Please provide at least one input.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("link", link);
    formData.append("userDescription", userDescription);
    if (image) formData.append("image", image);

    const response = await analyzeContent(formData);
    navigate("/result", { state: response.data });
  } catch (err) {
    alert("Analysis failed.");
  } finally {
    setLoading(false);
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Layout>
      <div className="upload-container">

        <div className="upload-header">
          <h1>Smart Content Analyzer</h1>
          <p>Upload image, paste link, or enter text for professional AI insights.</p>
        </div>

        {/* Image Upload */}
        <div className="upload-card">
          <h3>Upload Image</h3>
          <input
            type="file"
            className="upload-input"
            onChange={handleImageChange}
          />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

            
        {/* User Image Description */}
        <div className="upload-card">
          <h3>Describe the Image (Optional)</h3>
          <textarea
            className="upload-textarea"
            rows="3"
            placeholder="Example: A superhero with lightning powers..."
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
          />
        </div>

        {/* Link Input */}
        <div className="upload-card">
          <h3>Paste Product / Website Link</h3>
          <input
            type="text"
            placeholder="https://example.com"
            className="upload-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        {/* Text Input */}
        <div className="upload-card">
          <h3>Enter Text</h3>
          <textarea
            className="upload-textarea"
            rows="4"
            placeholder="Enter additional details..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Analyze Button */}
        <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
  {loading ? "Analyzing..." : "Analyze Content"}
</button>

      </div>
    </Layout>
  );
};

export default Upload;