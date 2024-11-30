"use client";

import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { getAllStatusWithPid, getEmailTemplates } from "../../../db/index";
import Link from "next/link";

export default function DraftsPage() {
  interface Owner {
    id: string;
    name: string;
    email: string;
  }

  interface Template {
    id: number;
    subject: string;
    body: string;
  }

  const [owners, setOwners] = useState<Owner[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recipients from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const currentMonth = new Date().toLocaleString("default", { month: "short" });
        const month = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
        const users = await getAllStatusWithPid(month);
        const ownersData = users.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email || "example@gmail.com", // hardcoded email, replace with real field
        }));
        setOwners(ownersData);

        // Fetch templates from the database
        const emailTemplates = await getEmailTemplates();
        setTemplates(emailTemplates);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Function to send an email
  const sendEmail = (recipients: string[], subject: string, body: string): void => {
    emailjs.init("nyUk3INa6W8JuMX21");
    recipients.forEach((email) => {
      const templateParams = {
        to_email: email,
        subject: subject,
        message: body,
        from_name: "Admin",
      };

      emailjs
        .send("service_8xks4aq", "template_11gz87f", templateParams)
        .then((response) => {
          console.log(`Email sent to ${email}:`, response);
        })
        .catch((error) => {
          console.error(`Failed to send email to ${email}:`, error);
        });
    });
    alert("Emails sent successfully!");
  };

  // Function to handle sending a draft email
  const sendDraftEmail = (id: number): void => {
    const draft = templates.find((t) => t.id === id);
    if (draft) {
      if (selectedRecipients.length === 0) {
        alert("Please select at least one recipient.");
        return;
      }
      sendEmail(selectedRecipients, draft.subject, draft.body);
    } else {
      alert("Template not found.");
    }
  };

  const handleRecipientSelection = (id: string) => {
    setSelectedRecipients((prev) =>
      prev.includes(id)
        ? prev.filter((recipientId) => recipientId !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-700">Email Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your saved email templates.
          </p>
        </div>
        <Link
          href="/admin/create-draft"
          className="dark:bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:dark:bg-gray-800 transition"
        >
          Create New Template
        </Link>
      </header>

      <main className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Recipients</h2>
        <ul className="mb-6 space-y-2">
          {owners.map((owner) => (
            <li key={owner.id} className="flex items-center">
              <input
                type="checkbox"
                id={owner.id}
                value={owner.email}
                onChange={() => handleRecipientSelection(owner.email)}
                className="mr-2"
              />
              <label htmlFor={owner.id} className="dark:text-gray-300">
                {owner.name} ({owner.email})
              </label>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Templates</h2>
        {templates.length > 0 ? (
          <ul className="space-y-4">
            {templates.map((template) => (
              <li
                key={template.id}
                className="p-4 bg-gray-50 rounded-md shadow-md dark:bg-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {template.subject}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{template.body}</p>
                <button
                  onClick={() => sendDraftEmail(template.id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition"
                >
                  Send Email
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No templates available.
          </p>
        )}
      </main>
    </div>
  );
}
