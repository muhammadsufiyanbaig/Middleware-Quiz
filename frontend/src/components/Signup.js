import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const togglePasswordVisibility1 = () => {
    setShow1(!show1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields before submitting");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    } else {
      setPasswordMatchError(false);
    }
    if (formData.fullName && formData.email && formData.password && formData.confirmPassword) {
      const response = await axios.post("http://localhost:5001/signup", formData);
      console.log("Signup success:", response.data);
      alert("Your account is creadted successfully")
    } else {
      console.error("Signup error:", error.response.data);
      setError(error.response.data.message);
    }
 navigate('/login');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          SignUp to create your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="text"
                className="block w-full px-3 border-2 border-gray-500 py-1.5 text-gray-900 focus:ring-blue-500 sm:text-sm"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
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
                type={"email"}
                autoComplete="email"
                className="block w-full px-3 border-2 border-gray-500 py-1.5 text-gray-900 focus:ring-blue-500 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
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
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={show1 ? "text" : "password"}
                autoComplete="current-password"
                className="block w-full px-3 border-2 border-gray-500 py-1.5 text-gray-900 sm:text-sm"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-3 mr-3"
                onClick={togglePasswordVisibility1}
              >
                {!show1 ? (
                  <FiEyeOff className="text-green-500" />
                ) : (
                  <FiEye className="text-green-500" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center  bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Create your account
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-green-500 hover:text-green-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
