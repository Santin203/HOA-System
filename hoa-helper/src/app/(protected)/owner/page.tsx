"use client";

import { useState, useEffect } from "react";
import { getUserPriv, getHistoryWithUid } from "../../db/index"; // Updated import path

export default function OwnerDashboard() {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<string>("Pending"); // Default status
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const fetchCurrentUserData = async (userId: number) => {
    try {
      const user = await getUserPriv(userId);
      setCurrentUser(user);

      if (user) {
        const history = await getHistoryWithUid(userId);
        if (history && history.payments) {
          const formattedPayments = history.payments.map((entry: any) => ({
            paymentId: entry.payment.id,
            date: new Date(entry.payment.dueDate),
            status: entry.status ? "Paid" : "Pending",
          }));
          setPayments(formattedPayments);

          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          const currentPayment = formattedPayments.find(
            (payment) =>
              payment.date.getMonth() === currentMonth &&
              payment.date.getFullYear() === currentYear
          );
          setPaymentStatus(currentPayment ? currentPayment.status : "Pending");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) fetchCurrentUserData(parseInt(userId, 10));
  }, []);

  const formatDayMonth = (date: Date) => {
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two-digit month
    const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
    return `${year}/${month}/${day}`;
  };

  // Helper method to compare formatted dates using getFullYear(), getMonth(), and getDate()
  const getFormattedDateForComparison = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return { year, month: month - 1, day }; // month is zero-indexed in JavaScript Date
  };

  // Filter payments by the start and end dates using getFullYear(), getMonth(), and getDate()
  const filteredPayments = payments.filter((payment) => {
    const { year, month, day } = getFormattedDateForComparison(startDate);
    const startDateObj = new Date(year, month, day);

    const { year: endYear, month: endMonth, day: endDay } = getFormattedDateForComparison(endDate);
    const endDateObj = new Date(endYear, endMonth, endDay);

    const paymentYear = payment.date.getFullYear();
    const paymentMonth = payment.date.getMonth();
    const paymentDay = payment.date.getDate();

    return (
      (paymentYear > startDateObj.getFullYear() ||
        (paymentYear === startDateObj.getFullYear() &&
          (paymentMonth > startDateObj.getMonth() ||
            (paymentMonth === startDateObj.getMonth() && paymentDay >= startDateObj.getDate())))) &&
      (paymentYear < endDateObj.getFullYear() ||
        (paymentYear === endDateObj.getFullYear() &&
          (paymentMonth < endDateObj.getMonth() ||
            (paymentMonth === endDateObj.getMonth() && paymentDay <= endDateObj.getDate()))))
    );
  });

  return (
    <div className="min-h-screen p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">HOA Owner Dashboard</h1>
        <p className="dark:text-gray-700 mt-2">View payment history and current status.</p>
        {currentUser && (
          <div className="mt-4">
            <p className="text-lg dark:text-gray-700">
              <strong>Name:</strong> {currentUser.name}
            </p>
            <p className="text-lg dark:text-gray-700">
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p className="text-lg dark:text-gray-700">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  paymentStatus === "Paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                }`}
              >
                {paymentStatus}
              </span>
            </p>
          </div>
        )}
      </header>

      <div className="mb-6">
        <label className="font-semibold dark:text-gray-700">Filter Payments by Date Range:</label>
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
        <h2 className="text-lg font-semibold dark:text-gray-200 mb-4">Payment History</h2>
        <table className="min-w-full text-gray-800 dark:text-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Month's Payment</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{formatDayMonth(payment.date)}</td>
                <td className="px-4 py-2">{payment.paymentId}</td>
                <td className="px-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}