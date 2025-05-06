import React, { useState } from "react";
import { useProblemStore } from "@/store/problemStore";
import ProblemCard from "./ProblemCard";
import SkeletonGrid from "@/skeleton/SkeletonGrid";

function ProblemList() {
  const { filteredProblems, isLoading } = useProblemStore();
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 12; // Adjust as needed

  // Calculate pagination values
  const totalProblems = filteredProblems().length;
  const totalPages = Math.ceil(totalProblems / problemsPerPage);
  const paginatedProblems = filteredProblems().slice(
    (currentPage - 1) * problemsPerPage,
    currentPage * problemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <SkeletonGrid />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProblems.map((problem) => (
          <ProblemCard
            key={`${problem.contestId}-${problem.index}`}
            problem={problem}
          />
        ))}
      </div>

      {totalProblems === 0 && !isLoading ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700">
            No problems found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search filters
          </p>
        </div>
      ) : (
        totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Previous
              </button>

              {/* Show first page, current page with neighbors, and last page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 min-w-[40px] border rounded-lg ${
                        page === currentPage
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "text-gray-600 hover:bg-gray-100"
                      } transition-colors`}>
                      {page}
                    </button>
                    {array[index + 1] > page + 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                  </React.Fragment>
                ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Next
              </button>
            </nav>
          </div>
        )
      )}
    </div>
  );
}

export default ProblemList;
