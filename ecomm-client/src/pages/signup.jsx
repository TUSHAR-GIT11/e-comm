import { useState } from "react";
import { SIGNUP_USER } from "../gqloperations/mutation";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [register, { data, loading, error }] = useMutation(SIGNUP_USER);

  if (loading) return <h1>Creating your account...</h1>;
  if (data) {
    localStorage.setItem("token", data.register.jwt);
    navigate("/");
  }

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    register({
      variables: {
        input: formData,
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create an <span className="text-green-600">Account</span>
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error.message}
          </div>
        )}

        {data && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            Account created successfully! You can login now.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer hover:underline">
            <button onClick={() => navigate("/login")}>Login</button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
