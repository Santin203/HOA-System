"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers, setRemindTime } from "../db";
import { getUserInfo } from "../db/index"; 
import { getStatusWithUidPid } from "../db/index"; 
import emailjs from "emailjs-com";


const LoginPage: React.FC = () => {
  const [id, setId] = useState("");
  const router = useRouter();
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [UserInfo, setUserInfo] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  React.useEffect(() => {
    const fetchUsers = async () => {
    const users = await getAllUsers();
    const ids = users.map((user) => user.id.toString());
    setRegisteredIds(ids);
    };
    fetchUsers();
  }, []);

  // Function to send email
  const sendEmail = (name: string, email: string, subject: string, message: string): void => {
    emailjs.init("nyUk3INa6W8JuMX21");
    const templateParams = {
      to_email: email,
      subject: subject,
      message: message,
      from_name: "Admin",
      to_name: name,
    };

    emailjs.send("service_8xks4aq", "template_klizmcs", templateParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("Email sent!");
      })
      .catch((error) => {
        console.error("Email send error:", error);
        alert("Failed to send email. Please try again.");
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the ID is registered
    if (registeredIds.includes(id)) 
    {
      localStorage.setItem("id", id);
      const userInfo = await getUserInfo(Number(id)); // Fetch user info
      setUserInfo(userInfo);
     
      if (userInfo) 
      {
        if(userInfo.remindTime)
        {
          const today = new Date();
          const record = await getStatusWithUidPid(Number(id),month[today.getMonth()])
          
          if (today.getTime() >= userInfo.remindTime.getTime())
          {
            if(record && record.status == false)
            {
              await sendEmail(
              userInfo.name,
              userInfo.email,
              "Automatic Payment Reminder",
              "This is an automatic payment reminder from HOA. Please do not reply."
              );
            }
            if(userInfo.remindFrequency && userInfo.remindFrequency == "Weekly")
            {
              const next = new Date();
              next.setDate(today.getDate() + 7);
              await setRemindTime(Number(id), next.getFullYear(), 
                next.getMonth(), next.getDate());
            }
            else // 1 months by default
            {
              const next = new Date();
              next.setMonth(today.getMonth() + 1);
              await setRemindTime(Number(id), next.getFullYear(), 
                next.getMonth(), next.getDate());
            }
          }
            
        }
      }
      router.push("/owner");
    } 
    else 
    {
      // Notify user that they need to sign up
      alert("This ID is not registered. Please sign up.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
          HOA Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* ID Input Field */}
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="Enter your ID"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Redirect Option */}
        {/* <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Don’t have an ID?{" "}
          <a
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
