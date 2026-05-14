import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {

    
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await API.get("/submissions");

      setSubmissions(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.category
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.legalQuery
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-2xl">
        Loading...
      </h1>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Legal Query Dashboard
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            AI-assisted legal intake management system
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, category, or query..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500 mb-6">
            No matching legal queries found.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {filteredSubmissions.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-500">
                {item.contact}
              </p>

              <p className="mt-3">
                {item.legalQuery}
              </p>

              <div className="mt-4 flex gap-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category || "Other"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority ===
                        "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.priority || "Unknown"}
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;