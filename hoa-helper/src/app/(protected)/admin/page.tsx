"use client";

import { useState, useEffect } from "react";
import { getAllStatusWithPid } from "@/app/db";

export default function AdminDashboard() {
  interface Owner {
    id: string;
    name: string;
    property: string;
    status: string;
  }

  const [owners, setOwners] = useState<Owner[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const currentMonth = new Date().toLocaleString('default', { month: 'short' });
        const month = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
        const users = await getAllStatusWithPid(month);
        console.log(users);
        // Map database data to match the Owner interface
        const ownersData = users.map((user: any) => ({
          id: user.id,
          name: user.name,
          property: user.homeId || "Unknown Property", // Replace with a property field if available
          status: user.payments[0]?.status ? "Paid" : "Pending",
        }));
        setOwners(ownersData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Function to handle sending a reminder
  const sendReminder = (id: string): void => {
    const owner = owners.find((o) => o.id === id);
    if (owner) {
      alert(`Reminder sent to ${owner.name} for payment`);
    }
  };

  // Filtered data
  const filteredOwners = owners.filter((owner) =>
    filter === "All" ? true : owner.status === filter
  );

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">
          HOA Admin Dashboard
        </h1>
        <p className="dark:text-gray-700 mt-2">
          View all property owners and manage payment statuses.
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div>
          <label className="mr-2 font-semibold dark:text-gray-700">
            Filter by Status:
          </label>
          <select
            className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <main className="overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <table className="min-w-full text-gray-800 dark:text-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Owner Name</th>
              <th className="px-4 py-2 text-left">Property</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr
                key={owner.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{owner.name}</td>
                <td className="px-4 py-2">{owner.property}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      owner.status === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {owner.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {owner.status === "Pending" && (
                    <button
                      onClick={() => sendReminder(owner.id)}
                      className="text-sm text-white dark:bg-gray-600 hover:dark:bg-gray-500 px-3 py-1 rounded"
                    >
                      Send Reminder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
