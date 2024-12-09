"use client";

import { useState } from "react";
import { setRemindFreq, setRemindMethod, setRemindTime } from "../../../db/index"; // Adjust the import path as needed

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: "",
    period: "",
    method: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare data for the database
      const reminderInfo = {
        userId: formData.name,
        reminder_period: formData.period,
        reminder_method: formData.method,
      };

      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User ID not found in local storage.");
        return;
      }
  

      const response = await setRemindFreq(
        Number(userId),
        reminderInfo.reminder_period
      );

      const response2 = await setRemindMethod(
        Number(userId),
        reminderInfo.reminder_method
      );

      const n = new Date();
      n.setMonth(n.getMonth()+1);
      n.setDate(1);
      
      const response3 = await setRemindTime(
        Number(userId),
        n.getFullYear(), n.getMonth(), n.getDate()
      );

      if (response && response2 && response3) {
        successBox();
        window.location.href = "/settings";
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
            <legend className="text-black dark:text-gray-200 font-semibold text-lg mb-4">
              User Payment Period
            </legend>

            {/* Remind Period (select input) */}
            <label htmlFor="reminder_period" className="block mb-2">
              <p className="text-black dark:text-gray-200 mt-2">Remind Period:</p>
            </label>
            <select
              id="reminder_period"
              name="period"
              required
              onChange={handleChange}
              value={formData.period}
              className="dark:text-black border rounded px-3 py-2 mb-4 w-full"
            >
              <option value="" disabled>Select Period</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            {/* Remind Method (select input) */}
            <label htmlFor="reminder_method" className="block mb-2">
              <p className="text-black dark:text-gray-200 mt-2">Remind Method:</p>
            </label>
            <select
              id="reminder_method"
              name="method"
              required
              onChange={handleChange}
              value={formData.method}
              className="dark:text-black border rounded px-3 py-2 mb-4 w-full"
            >
              <option value="" disabled>Select Method</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
            </select>

            {/* Submit Button */}
            <input
              type="submit"
              value="Submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            />
          </fieldset>
        </form>
    </main>
    </div>
  );
}