import { useState } from "react";
import { LOGIN_USER } from "../gqloperations/mutation";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate()
  const [formData, setformData] = useState({});
  const [Login, { data, loading, error}] = useMutation(LOGIN_USER)

   if(loading) return <h1>loading...</h1>
   if(data){
    localStorage.setItem("token",data.login.jwt)
    navigate("/")
   }

  function handleSubmit(e) {
  e.preventDefault();

  console.log("FINAL PAYLOAD:", JSON.stringify(formData, null, 2));

  Login({
    variables: {
      input: {
        identifier: formData.identifier?.trim(),
        password: formData.password
      }
    }
  });
}

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        {
            error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error.message}
            </div>
        }
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to <span className="text-green-600">ShopKart</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-gray-600 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="Enter email or username"
              name="identifier"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <span className="text-green-600 cursor-pointer hover:underline">
            <button onClick={()=>navigate("/signup")} >Sign up</button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
