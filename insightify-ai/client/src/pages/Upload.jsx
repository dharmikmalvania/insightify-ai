import { useState } from "react";
import Layout from "../components/Layout";
import { analyzeContent } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/upload.css";

const Upload = () => {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("link", link);
    if (image) formData.append("image", image);

    const response = await analyzeContent(formData);
    navigate("/result", { state: response.data });
  };

  return (
    <Layout>
      <div className="upload-container">

        <div className="upload-box">
          <h2>Upload Image</h2>
          <input
            type="file"
            className="upload-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <h3>Paste Product Link</h3>
          <input
            type="text"
            placeholder="https://..."
            className="upload-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div>
          <h3>Enter Text</h3>
          <textarea
            className="upload-textarea"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button className="upload-btn" onClick={handleAnalyze}>
          Analyze Now
        </button>

      </div>
    </Layout>
  );
};

export default Upload;
