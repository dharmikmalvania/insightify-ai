import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-500">
        Insightify AI
      </Link>

      <Link
        to="/upload"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
      >
        Analyze
      </Link>
    </div>
  );
};

export default Navbar;
