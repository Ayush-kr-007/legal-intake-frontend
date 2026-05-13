import { Link } from "react-router-dom";

function Navbar() {
  return (
  <nav className="bg-black/80 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">      <h1 className="text-xl font-bold">
        AdalatIQ Legal Intake
      </h1>

      <div className="flex gap-6">
        <Link
          to="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-gray-300 transition"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;