import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSuccess = (token) => {
    // Save the token to local storage
    localStorage.setItem("usertoken", token);

    // Redirect to a different page on successful login
    navigate("/shop");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/UserLogin", formData);

      // Handle success
      if (response.data.message === "approve" && response.data.token) {
        setSuccessMessage("Login successful");
        handleLoginSuccess(response.data.token); // Save the token to local storage
      } else {
        setErrors({ general: "Login failed. Please try again later." });
      }
    } catch (error) {
      // Handle login error
      if (error.response) {
        console.error("Login failed:", error.response.data);
        setErrors(error.response.data);
      } else {
        console.error("Login failed:", error.message);
        setErrors({ general: "Login failed. Please try again later." });
      }
    }
  };

  return (
    <section className="text-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="text-red-500 text-sm">{errors.general}</div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm">{successMessage}</div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hoverbg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-semibold rounded-lg text-sm py-3"
            >
              Log In
            </button>

            <p className="text-sm font-light mt-3">
              Dont have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-600 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
