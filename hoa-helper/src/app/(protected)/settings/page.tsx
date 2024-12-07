"use client";

import { useState, useEffect } from "react";
import { getUserInfo } from "../../db/index"; // Adjust the import path as needed

export default function AdminDashboard() {
  const [UserInfo, setUserInfo] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Fetch user information
  const fetchUserInfo = async (userId: number) => {
    try {
      const info = await getUserInfo(userId);
      setUserInfo(info);
    } catch (err) {
      console.error("Error fetching user information:", err);
      setError("Unable to retrieve user information. Please try again later.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      fetchUserInfo(parseInt(userId, 10));
    }
  }, []);

  const formatDayMonth = (date: Date) => {
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two-digit month
    const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">HOA Settings</h1>
        <p className="dark:text-gray-700 mt-2">View and update user information.</p>
      </header>

      {/* Main Content */}
      <main className="relative   overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold dark:text-gray-200 mb-4">User Information</h2>
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : UserInfo ? (
            <div>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>User ID:</strong> {UserInfo.id}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Name:</strong> {UserInfo.name}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Email:</strong> {UserInfo.email}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Home ID:</strong> {UserInfo.homeId}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Remind method:</strong> {UserInfo.remindMethod}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Remind Frequency:</strong> {UserInfo.remindFrequency ? UserInfo.remindFrequency : "Not set"}
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                <strong>Next reminder date:</strong> {UserInfo.remindTime? formatDayMonth(UserInfo.remindTime): "Not set"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Loading user information...</p>
          )}
        {/* View Payment Information Section */}
        <section>
          <div className="relative flex items-end h-20 gap-6 ">
            <a
              href="/settings/viewPayInfo"
              className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              View Payment Information
            </a>
             <a
              href="/settings/setRemind"
              className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Update Remind Method and Frequency
            </a>
            
          </div>
        </section>
      </main>
    </div>
  );
}
