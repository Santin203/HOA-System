import React from 'react';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

// Check if the user is an admin
const isAdmin = true; // Set to true for demonstration purposes

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Section */}
            <header className="dark:bg-gray-800 text-white py-4 shadow-md">
                <div className="container mx-auto px-6">
                    <h1 className="text-2xl font-bold">HOA Helper</h1>
                </div>
            </header>

            {/* Navigation Section */}
            <div className="flex flex-1">
                <nav className="w-64 bg-gray-800 text-gray-200 shadow-lg">
                    <ul className="flex flex-col space-y-2 py-4 px-6">
                        {isAdmin && (
                            <li>
                                <a
                                    href="/admin"
                                    className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
                                >
                                    Admin Dashboard
                                </a>
                            </li>
                        )}
                        <li>
                            <a
                                href="/owner"
                                className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
                            >
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin"
                                className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="block py-2 px-4 rounded hover:dark:bg-gray-500 hover:text-white"
                            >
                                Log Out
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="flex-1 bg-gray-100 p-6">
                    {children}
                </main>
            </div>

            {/* Footer Section
            <footer className="dark:bg-gray-700 text-gray-300 py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Property Manager. All rights reserved.</p>
                </div>
            </footer> */}
        </div>
    );
};

export default ProtectedLayout;