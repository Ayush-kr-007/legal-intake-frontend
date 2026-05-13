import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Home() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await API.post(
        "/submissions",
        data
      );

      console.log(response.data);

      alert("Submission Successful!");

      reset();

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 flex justify-center items-center p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-white/30"
        >
          <h2 className="text-4xl font-extrabold mb-2 text-center text-gray-800">
            Legal Consultation Form
          </h2>

          <p className="text-gray-600 text-center mb-8">
            Submit your legal issue and our team will review it.
          </p>

          {/* NAME */}
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* CONTACT */}
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email or Phone
            </label>

            <input
              type="text"
              placeholder="Enter email or phone"
              {...register("contact", {
                required: "Contact is required",
              })}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* QUERY */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Legal Query
            </label>

            <textarea
              rows="6"
              placeholder="Describe your legal issue..."
              {...register("legalQuery", {
                required: "Legal query is required",
                minLength: {
                  value: 10,
                  message:
                    "Query must be at least 10 characters",
                },
              })}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.legalQuery && (
              <p className="text-red-500 text-sm mt-1">
                {errors.legalQuery.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading
              ? "Submitting..."
              : "Submit Query"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;