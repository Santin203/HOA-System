"use client";

import { useState } from "react";

export default function AdminDashboard() {
  interface Owner {
    id: number;
    name: string;
    property: string;
    status: string;
  }

  // Sample data for demonstration purposes
  const [owners, setOwners] = useState<Owner[]>([
    { id: 1, name: "John Doe", property: "123 Maple St", status: "Paid" },
    { id: 2, name: "Jane Smith", property: "456 Oak St", status: "Pending" },
    { id: 3, name: "Alice Johnson", property: "789 Pine St", status: "Paid" },
    { id: 4, name: "Bob Brown", property: "101 Cedar Ave", status: "Pending" },
  ]);

  const [filter, setFilter] = useState<string>("All");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

// Function to handle sending a reminder
const successBox = (id: number): void => {
    const owner = owners.find((o) => o.id === id);
    if (owner) {
      alert(`Information Updated!`);
    }
  };

  // Filtered data
  const filteredOwners = owners.filter((owner) =>
    filter === "All" ? true : owner.status === filter
  );

  return (
    <div className="min-h-screen p-8">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-700">HOA Settings</h1>
        <p className="dark:text-gray-700 mt-2">Update payment settings.</p>
      </header>
  
      {/* Main Content */}
      <main className="overflow-x-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
  
      {/* User Information Form */}
      <form>
        <fieldset>
          <legend className="font-semibold text-lg mb-4">User Card Information</legend>
          <label htmlFor="name" className="block mb-2">
            Name as shows in card:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border rounded px-3 py-2 mb-4 w-full"
          />

        <label>
            Card number:
        </label>
        <input
            type="card_num"
            id="card_num"
            name="card_num"
            placeholder="1234 1234 1234 1234" 
            required maxLength={16}
            className="border rounded px-3 py-2 mb-4 w-full"
          />
        
          <label htmlFor="dob" className="block mb-2">
            Expiration date:
          </label>
          <input
          //cambiar date a mes(2), ano(4)}!!!!!
            type="date"
            id="dob"
            name="dob"
            required
            className="border rounded px-3 py-2 mb-4 w-full"
          />
        <label>
            Security code (CVV):
        </label>
        <input
            type="security_code"
            id="security_code"
            name="security_code"
            placeholder="123" 
            required maxLength={3}
            className="border rounded px-3 py-2 mb-4 w-full"
          />

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