"use client";

import React, { useState, useEffect } from "react";
import { getUserPriv } from "@/app/db";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // State to track admin status
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user ID from local storage
        const storedUser = Number(localStorage.getItem("id"));
        if (!storedUser) {
          console.error("No user data found in local storage.");
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Fetch user data from the database
        const user = await getUserPriv(storedUser);
        setIsAdmin(user?.admin || false);
      } catch (error) {
        console.error("Error fetching user privileges:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="dark:bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold">HOA Helper</h1>
        </div>
      </header>

      {/* Navigation Section */}
      <div className="flex flex-1">
        <nav className="w-64 bg-gray-800 text-gray-200 shadow-lg">
          <ul className="flex flex-col space-y-2 py-4 px-6">
            {isAdmin && (
              <li>
                <a
                  href="/admin"
                  className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
                >
                  Admin Dashboard
                </a>
              </li>
            )}
            <li>
              <a
                href="/owner"
                className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
