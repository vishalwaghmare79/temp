import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      if (res.success) {
        setAuth({
          user: res.user,
          token: res.token,
        });
        localStorage.setItem("auth", JSON.stringify(res));
        toast.success(res.message);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-8">
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-xl min-h-[500px]">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 bg-gray-50 p-10 text-gray-800 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome to Campus Cart!
          </h1>
          <p className="text-md text-center font-light mb-6">
            Log in to buy or sell preowned products within your campus community.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 rounded-lg text-white font-bold text-md shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Redirect to Register */}
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="text-blue-600 hover:underline transition duration-200"
            >
              Register
            </button>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Campus Life"
            className="h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-2xl font-bold mb-2">
                Buy and Sell on Campus
              </h2>
              <p className="text-md font-light">
                Connect with your campus community to trade preowned items
                easily and sustainably.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;