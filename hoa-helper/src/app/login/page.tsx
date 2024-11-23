"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [id, setId] = useState("");
  const router = useRouter();

  // Simulated list of registered IDs
  const registeredIds = ["12345", "67890", "1", "2", "3"];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the ID is registered
    if (registeredIds.includes(id)) {
      // Store ID in localStorage and navigate to /owner
      localStorage.setItem("id", id);
      router.push("/owner");
    } else {
      // Notify user that they need to sign up
      alert("This ID is not registered. Please sign up.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
          HOA Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* ID Input Field */}
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="Enter your ID"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Redirect Option */}
        {/* <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Don’t have an ID?{" "}
          <a
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
