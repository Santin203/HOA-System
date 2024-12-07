"use client";

import { useState } from "react";
import { setPaymentMethod } from "../../../db/index"; // Adjust the import path as needed

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    cardNum: "",
    date: "",
    securityCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare data for the database
      const paymentInfo = {
        name: formData.name,
        cardNumber: formData.cardNum,
        expirationYear: Number(formData.date.substring(0, 4)), // YYYY
        expirationMonth: Number(formData.date.substring(5, 7)), // MM
        securityCode: Number(formData.securityCode),
      };

      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User ID not found in local storage.");
        return;
      }
  

      const response = await setPaymentMethod(
        Number(userId),
        paymentInfo.name,
        paymentInfo.cardNumber,
        paymentInfo.expirationYear,
        paymentInfo.expirationMonth,
        paymentInfo.securityCode
      );

      if (response) {
        successBox();
        window.location.href = "/settings/viewPayInfo";
      }
    } catch (err) {
      console.error("Error updating payment method:", err);
    }
  };

  const successBox = (): void => {
    alert("Information Updated!");
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-700">HOA Settings</h1>
        <p className="text-gray-700 mt-2">Update Remind Settings.</p>
      </header>

      <main className="overflow-x-auto shadow-md rounded-lg p-6 bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-black dark:text-gray-200 font-semibold text-lg mb-4">User Card Information</legend>
            <label htmlFor="name" className="block mb-2">
            <p className="text-black dark:text-gray-200 mt-2">Name as shown on card:</p>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleChange}
              value={formData.name}
              className="text-black border rounded px-3 py-2 mb-4 w-full"
            />

            <label>
            <p className="text-black dark:text-gray-200 mt-2">Card number:</p>
            </label>
            <input
              type="text"
              id="card_num"
              name="cardNum"
              placeholder="1234 1234 1234 1234"
              required
              maxLength={16}
              minLength={16}
              onChange={handleChange}
              value={formData.cardNum}
              className="dark:text-black border rounded px-3 py-2 mb-4 w-full"
            />

            <label htmlFor="dob" className="block mb-2">
            <p className="text-black dark:text-gray-200 mt-2">Expiration date:</p>
            </label>
            <input
              type="month"
              id="start"
              name="date"
              required
              onChange={handleChange}
              value={formData.date}
              className="dark:text-black border rounded px-3 py-2 mb-4 w-full"
            />

            <label><p className="text-black dark:text-gray-200 mt-2">Security code (CVV):</p></label>
            <input
              type="text"
              id="security_code"
              name="securityCode"
              placeholder="123"
              required
              maxLength={3}
              minLength={3}
              onChange={handleChange}
              value={formData.securityCode}
              className="dark:text-black border rounded px-3 py-2 mb-4 w-full"
            />

            <a href="/settings">
            <input
              type="submit"
              value="Submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            />
            </a>
          </fieldset>
        </form>
      </main>
    </div>
  );
}
