"use client";

import { useState, useEffect } from "react";
import { getPaymentMethod } from "../../../db/index"; // Adjust the import path as needed

export default function OwnerDashboard() {
  const [paymentMethod, setPaymentMethod] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch user payment information
  const fetchPaymentMethod = async (userId: number) => {
    try {
      const method = await getPaymentMethod(userId);
      setPaymentMethod(method);
    } catch (err) {
      console.error("Error fetching payment method:", err);
      setError("Unable to retrieve payment method. Please try again later.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      fetchPaymentMethod(parseInt(userId, 10));
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">HOA Owner Dashboard</h1>
        <p className="dark:text-gray-700 mt-2">View payment methods and details.</p>
      </header>

      {/* Display payment method information */}
      <main className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold dark:text-gray-200 mb-4">Payment Method</h2>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : paymentMethod ? (
          <div>
            <p className="text-gray-800 dark:text-gray-300">
              <strong>Name on Card:</strong> {paymentMethod.nameInCard}
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              <strong>Card Number:</strong> **** **** **** {paymentMethod.cardNum.slice(-4)}
            </p>
            
            <p className="text-gray-800 dark:text-gray-300">
              <strong>Expiration Date:</strong>{" "}
              {new Date(paymentMethod.expDate).toLocaleDateString("en-US", {
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            {/* Main Content */}
      <main className="overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        

        {/* View Payment Information Section */}
        <section>
          <div className="flex gap-6">
            <a
              href="/settings/formSet"
              className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Update Payment Information
            </a>
          </div>
        </section>
      </main>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Loading payment method...</p>
        )}
      </main>
    </div>
  );
}
