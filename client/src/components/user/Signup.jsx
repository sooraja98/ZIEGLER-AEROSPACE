import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignupForm() {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data (add your validation logic here)
    if (formData.password !== formData.confirmPassword) {
     alert("Passwords do not match");
      return;
    }

    // If validation passes, send a POST request to the backend
    try {
      const response = await axios.post("http://localhost:4000/auth/userRegister", formData);
      if(response.data.message==="User alreday exist"){
        setSuccessMessage("User Already exist");

      }
      else{
        setSuccessMessage("Registration successful");
      }

      // Clear the form data
      setFormData({
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Handle registration error (e.g., display an error message)
      if (error.response) {
        // The request was made and the server responded with an error status code
        console.error("Registration failed:", error.response.data);
        setErrors(error.response.data);
      } else {
        // Something happened in setting up the request or making it
        console.error("Registration failed:", error.message);
        setErrors({ general: "Registration failed. Please try again later." });
      }
    }
  };

  return (
    <section className="text-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Create an Account
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="text-red-500 text-sm">{errors.general}</div>
            )}
            {successMessage==="User Already exist" ? (
              <div className="text-red-800 text-sm">{successMessage}</div>
            ):(
              <div className="text-green-500 text-sm">{successMessage}</div>
            )}
             <div>
              <label className="block text-sm font-semibold mb-2">
                Your User Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
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
            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hoverbg-primary-900 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-semibold rounded-lg text-sm py-3"
            >
              Create an Account
            </button>

            <p className="text-sm font-light mt-3">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary-600 hover:underline">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignupForm;
