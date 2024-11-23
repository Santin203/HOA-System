"use client";

import { useState, useEffect } from "react";

export default function OwnerDashboard() {
  interface Payment {
    id: string;
    date: string; // Format: "DD-MM-YYYY"
    memo: string;
  }

  interface Owner {
    id: string;
    name: string;
    property: string;
    status: string; // "Paid" or "Pending"
  }

  // Mock data for payments
  const [payments] = useState<Payment[]>([
    { id: "1", date: "09-10-2024", memo: "Payment 1" },
    { id: "1", date: "08-09-2024", memo: "Payment 2" },
    { id: "1", date: "01-07-2024", memo: "Payment 3" },
    { id: "1", date: "01-05-2024", memo: "Payment 4" },
    { id: "2", date: "01-03-2024", memo: "Payment 5" },
    { id: "2", date: "01-01-2024", memo: "Payment 6" },
    { id: "3", date: "01-01-2024", memo: "Payment 7" },
    { id: "4", date: "01-01-2024", memo: "Payment 8" },
  ]);

  // Mock data for owners
  const [owners] = useState<Owner[]>([
    { id: "1", name: "John Doe", property: "123 Maple St", status: "Paid" },
    { id: "2", name: "Jane Smith", property: "456 Oak St", status: "Pending" },
    { id: "3", name: "Alice Johnson", property: "789 Pine St", status: "Paid" },
    { id: "4", name: "Bob Brown", property: "101 Cedar Ave", status: "Pending" },
  ]);

  // const currentUserId = localStorage.getItem("id")
  // const currentUser = owners.find((owner) => owner.id === currentUserId);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Owner | undefined>(undefined);

  useEffect(() => {
    // Access localStorage only on the client side
    const userId = localStorage.getItem("id");
    setCurrentUserId(userId);

    if (userId) {
      const user = owners.find((owner) => owner.id === userId);
      setCurrentUser(user);
    }
  }, [owners]);

  // State for date range filtering
  const [startDate, setStartDate] = useState<string>("01-01-2024");
  const [endDate, setEndDate] = useState<string>("31-12-2024");

  // Function to convert date string to comparable format
  const parseDate = (date: string): number => {
    const [day, month, year] = date.split("-").map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  // Filtered payments based on the current user and date range
  const filteredPayments = payments
    .filter((payment) => payment.id === currentUserId)
    .filter(
      (payment) =>
        parseDate(payment.date) >= parseDate(startDate) &&
        parseDate(payment.date) <= parseDate(endDate)
    );

  return (
    <div className="min-h-screen p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">
          HOA Owner Dashboard
        </h1>
        <p className="dark:text-gray-700 mt-2">
          View payment history and current status.
        </p>
        <div className="mt-4">
          <p className="text-lg dark:text-gray-700">
            <strong>Name:</strong> {currentUser?.name}
          </p>
          <p className="text-lg dark:text-gray-700">
            <strong>Property:</strong> {currentUser?.property}
          </p>
          <p className="text-lg dark:text-gray-700">
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                currentUser?.status === "Paid"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {currentUser?.status}
            </span>
          </p>
        </div>
      </header>

      {/* Date Range Filter */}
      <div className="mb-6">
        <label className="font-semibold dark:text-gray-700">
          Filter Payments by Date Range:
        </label>
        <div className="flex space-x-4 mt-2">
          <div>
            <label className="block text-sm dark:text-gray-700">Start Date</label>
            <input
              type="date"
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-300"
              value={startDate.split("-").reverse().join("-")}
              onChange={(e) =>
                setStartDate(e.target.value.split("-").reverse().join("-"))
              }
            />
          </div>
          <div>
            <label className="block text-sm dark:text-gray-700">End Date</label>
            <input
              type="date"
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-gray-300"
              value={endDate.split("-").reverse().join("-")}
              onChange={(e) =>
                setEndDate(e.target.value.split("-").reverse().join("-"))
              }
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <main className="overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold dark:text-gray-200 mb-4">
          Payment History
        </h2>
        <table className="min-w-full text-gray-800 dark:text-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Memo</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2">{payment.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

