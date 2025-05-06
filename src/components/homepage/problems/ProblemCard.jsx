import React, { useState, useEffect } from "react";
import { useProblemStore } from "@/store/problemStore";
import { Link } from "react-router-dom";
const ProblemCard = ({ problem }) => {
  const { isLoading } = useProblemStore();

  const getDifficultyColor = (rating) => {
    if (!rating) return "bg-gray-200 text-gray-800";
    if (rating < 1200) return "bg-green-100 text-green-800";
    if (rating < 1400) return "bg-teal-100 text-teal-800";
    if (rating < 1600) return "bg-blue-100 text-blue-800";
    if (rating < 1900) return "bg-purple-100 text-purple-800";
    if (rating < 2100) return "bg-yellow-100 text-yellow-800";
    if (rating < 2400) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="p-6 space-y-4">
          <div className="h-7 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight hover:text-indigo-600">
            <Link
              to={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block">
              {problem.name}
            </Link>
            {problem.rating && (
              <span
                className={`ml-3 text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(
                  problem.rating
                )}`}>
                {problem.rating}
              </span>
            )}
          </h2>
          {problem.points && (
            <div className="flex items-center text-lg font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              <span className="mr-1">⭐</span>
              {problem.points}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
              Contest
            </p>
            <p className="text-sm font-medium text-gray-700">
              {problem.contestId}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider">
              Index
            </p>
            <p className="text-sm font-medium text-gray-700">{problem.index}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-green-500 uppercase tracking-wider">
              Type
            </p>
            <p className="text-sm font-medium text-gray-700">{problem.type}</p>
          </div>
          {problem.solvedCount && (
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                Solves
              </p>
              <p className="text-sm font-medium text-gray-700">
                {problem.solvedCount}
              </p>
            </div>
          )}
        </div>

        {problem.tags && problem.tags.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span
                  key={`${index}`}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-full px-3 py-1 text-xs font-medium shadow-sm border border-indigo-100 hover:bg-indigo-100 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Link
              to={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full font-medium transition-colors shadow-sm">
                Try it!
              </button>
            </Link>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
