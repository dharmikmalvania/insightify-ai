import axios from "axios";

export const analyzeContent = async (formData) => {
  return axios.post(
    "http://localhost:5000/api/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};