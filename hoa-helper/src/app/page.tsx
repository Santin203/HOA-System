import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Logo and Title */}
      <header className="flex flex-col items-center mb-10">
        <Image
          src="/hoa-logo.png"
          alt="Property Management Logo"
          width={120}
          height={120}
          priority
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">
          Welcome to Property Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
          Please select your role to get started
        </p>
      </header>

      {/* Buttons for Role Selection */}
      <div className="flex gap-6">
        <a
          href="/property-owner"
          className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Property Owner
        </a>
        <a
          href="/admin"
          className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Admin
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy;  2024 Property Manager. All rights reserved.
      </footer>
    </div>
  );
}
