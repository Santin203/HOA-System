"use client";

import { useState, useEffect } from "react";
import { getUserPriv, getPending } from "../../db/index"; 

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  // Track added payment IDs to prevent duplicates
  const addedPaymentIds = new Set<string>();

  // Fetch user data and pending payments
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      const userIdNumber = parseInt(userId, 10);

      // Fetch user privileges
      getUserPriv(userIdNumber).catch((error) =>
        console.error("Error fetching user privileges:", error)
      );

      // Fetch pending payments
      getPending(userIdNumber)
        .then((pendingPayments) => {
          const newNotifications = pendingPayments
            .filter(
              (userPayment: any) => !addedPaymentIds.has(userPayment.paymentId) // Avoid duplicates
            )
            .map((userPayment: any) => {
              // Mark payment as added
              addedPaymentIds.add(userPayment.paymentId);

              return {
                id: `payment-${userPayment.userId}-${userPayment.paymentId}`, // Unique key
                message: `Payment of $${userPayment.payment.amount.toFixed(
                  2
                )} due on ${new Date(
                  userPayment.payment.dueDate
                ).toLocaleDateString()} is pending.`,
                date: new Date(userPayment.payment.dueDate),
                type: "Payment",
              };
            });

          // Add new notifications without duplicates
          setNotifications((prev) => [...prev, ...newNotifications]);
        })
        .catch((error) =>
          console.error("Error fetching pending payments:", error)
        );
    }
  }, []);

  const formatDayMonth = (date: Date) => {
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two-digit month
    const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
    return `${year}/${month}/${day}`;
  };

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
                key={notification.id} // Unique key
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">
                {formatDayMonth(notification.date)}
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