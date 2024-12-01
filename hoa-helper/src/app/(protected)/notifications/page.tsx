"use client";

import { useState, useEffect } from "react";
import { getUserPriv } from "../../db/index"; // Import only getUserPriv function

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  // Dummy notifications for the UI
  const dummyNotifications = [
    {
      id: 1,
      message: "Your payment for March is due.",
      date: new Date("2024-03-01"),
      type: "Reminder",
    },
    {
      id: 2,
      message: "Community event scheduled for April 15th.",
      date: new Date("2024-04-01"),
      type: "Event",
    },
    {
      id: 3,
      message: "Your account has been updated successfully.",
      date: new Date("2024-02-20"),
      type: "System",
    },
  ];

  // Fetch user data and set dummy notifications
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      getUserPriv(parseInt(userId, 10))
        .catch((error) => console.error("Error fetching user data:", error));
    }
    setNotifications(dummyNotifications);
  }, []);

  // Automatically apply filters and sort notifications whenever dates or notifications change
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = notifications
      .filter((notification) => {
        const notificationDate = new Date(notification.date);
        return notificationDate >= start && notificationDate <= end;
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Newest first

    setFilteredNotifications(filtered);
  }, [notifications, startDate, endDate]);

  return (
    <div className="min-h-screen p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">Notifications</h1>
        <p className="dark:text-gray-700 mt-2">
          View all notifications and filter by date range.
        </p>
      </header>

      <div className="mb-6">
        <label className="font-semibold dark:text-gray-700">
          Filter Notifications by Date Range:
        </label>
        <div className="flex space-x-4 mt-2">
          <div>
            <label className="block text-sm dark:text-gray-700">Start Date</label>
            <input
              type="date"
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-300"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm dark:text-gray-700">End Date</label>
            <input
              type="date"
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-300"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold dark:text-gray-200 mb-4">
          Notifications
        </h2>
        <table className="min-w-full text-gray-800 dark:text-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification) => (
              <tr
                key={notification.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">
                  {notification.date.toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{notification.type}</td>
                <td className="px-4 py-2">{notification.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}


