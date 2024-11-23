"use client";

import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    id: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.id) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    setSuccess(true);
    // You can add an API call here to handle signup
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
          Create an Account
        </h1>
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-500 text-sm">
            Account created successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Id Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="1234"
              value={formData.id}
              onChange={handleChange}
            />
          </div>

          {/* Signup Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Redirect Option */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
