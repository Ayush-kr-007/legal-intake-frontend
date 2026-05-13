import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../services/api";

function QueryForm() {
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

      const response = await API.post("/submissions", data);

      console.log(response.data);

      alert("Submission Successful!");

      reset();
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl"
    >
      <h2 className="text-3xl font-bold mb-2 text-center">
        Legal Consultation Form
      </h2>

      <p className="text-gray-500 text-center mb-8">
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
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
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
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
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
              message: "Query must be at least 10 characters",
            },
          })}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
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
        {loading ? "Submitting..." : "Submit Query"}
      </button>
    </form>
  );
}

export default QueryForm;