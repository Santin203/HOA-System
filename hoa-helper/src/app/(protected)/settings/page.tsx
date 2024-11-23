"use client";

import { useState } from "react";

export default function AdminDashboard() {
  interface Owner {
    id: number;
    name: string;
    property: string;
    status: string;
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">HOA Settings</h1>
        <p className="dark:text-gray-700 mt-2">Update payment settings.</p>
      </header>
  
      {/* Main Content */}
      <main className="overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
  
      {/* Buttons for Role Selection */}
      <div className="flex gap-6">
        <a
          href="/settings/formSet"
          className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Update Payment Information
        </a>
      </div>
      </main>
    </div>
  );
  

}