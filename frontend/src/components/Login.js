import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields before submitting");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        formData, {
          withCredentials: true
        }
      );
      // console.log("Login success:", response.data);
      localStorage.setItem('userId', response.data.id);
    } catch (error) {
      console.error("Login error:", error.response.data);
      setError(error.response.data.message);
    }
    navigate("/quiz");
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full px-3 border-2 border-gray-500 py-1.5 text-gray-900 focus:ring-blue-600 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  className="block w-full px-3 border-2 border-gray-500 py-1.5 text-gray-900 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-3 mr-3"
                  onClick={togglePasswordVisibility}
                >
                  {!show ? (
                    <FiEyeOff className="text-green-500" />
                  ) : (
                    <FiEye className="text-green-500" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center  bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-green-500 hover:text-green-500"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
