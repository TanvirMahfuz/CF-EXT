import React, { useEffect } from "react";
import ProblemList from "@/components/homepage/problems/ProblemList";
import { useProblemStore } from "@/store/problemStore";
import {
  FiSearch,
  FiFilter,
  FiTrendingUp,
  FiClock,
  FiStar,
} from "react-icons/fi";

function Problems() {
  const {
    searchQuery,
    activeTab,
    difficultyFilter,
    setSearchQuery,
    setActiveTab,
    setDifficultyFilter,
    getStats,
    getProblems,
    searchProblems, // Added the search function
  } = useProblemStore();

  useEffect(() => {
    getProblems();
  }, [getProblems]);

  const stats = getStats();

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "easy", name: "Easy", color: "text-green-500" },
    { id: "medium", name: "Medium", color: "text-yellow-500" },
    { id: "hard", name: "Hard", color: "text-red-500" },
  ];

  const tabs = [
    { id: "all", name: "All Problems", icon: <FiFilter className="mr-1" /> },
    { id: "popular", name: "Popular", icon: <FiTrendingUp className="mr-1" /> },
    { id: "recent", name: "Recent", icon: <FiClock className="mr-1" /> },
    {
      id: "recommended",
      name: "Recommended",
      icon: <FiStar className="mr-1" />,
    },
  ];

  // Get search results count for stats display
  const searchResultsCount = searchProblems().length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Coding Challenges
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharpen your skills with our curated collection of programming
            problems
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search problems by name or tags..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setDifficultyFilter(diff.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    difficultyFilter === diff.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${diff.color || "text-gray-700"}`}>
                  {diff.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto mt-6 pb-2 -mx-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 mx-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar - Now shows both total and filtered counts */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium">
              Total Problems
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              {stats.total}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium">Showing</div>
            <div className="text-2xl font-bold text-indigo-400">
              {searchResultsCount}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium">Easy</div>
            <div className="text-2xl font-bold text-green-500">
              {stats.easy}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium">Medium</div>
            <div className="text-2xl font-bold text-yellow-500">
              {stats.medium}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium">Hard</div>
            <div className="text-2xl font-bold text-red-500">{stats.hard}</div>
          </div>
        </div>

        {/* Problem List */}
        <ProblemList />
      </div>
    </div>
  );
}

export default Problems;
