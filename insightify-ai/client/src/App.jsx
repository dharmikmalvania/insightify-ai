import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
