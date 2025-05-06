import React, { useState } from "react";

import { FiSearch, FiUser } from "react-icons/fi";
import { useUserStore } from "@/store/userStore";
import UserProfile from "@/components/profile/UserProfile";
const UserProfilePage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, getUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await getUser(username);
    } catch (err) {
      setError(err.message || "Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Search Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Codeforces User Profile
          </h1>

          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Codeforces handle"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute inset-y-0 right-0 px-4 flex items-center bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 focus:outline-none disabled:opacity-50">
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiSearch className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 "></div>
          </div>
        )}

        {/* Profile Display */}
        {user && <UserProfile user={user} />}
      </div>
    </div>
  );
};



export default UserProfilePage;
