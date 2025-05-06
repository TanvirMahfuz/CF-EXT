import React from "react";
import { useContestStore } from "@/store/contestStore";
import { useProblemStore } from "@/store/problemStore";
import { convertTime } from "@/lib/dateTime";
import { Link } from "react-router-dom";

function Home() {
  const { contests, getContests } = useContestStore();
  const { problems, getProblems } = useProblemStore();

  React.useEffect(() => {
    getContests();
    getProblems();
  }, [getContests, getProblems]);

  // Filter upcoming contests (phase = "BEFORE")
  const upcomingContests = contests
    .filter((contest) => contest.phase === "BEFORE")
    .slice(0, 5); // Limit to 5 upcoming contests

  // Get recent problems (14 most recent)
  const recentProblems = problems.slice(0, 14);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Sharpen Your Competitive Coding Skills
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Practice with curated problems and stay updated with upcoming contests
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/problems"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Browse Problems
          </Link>
          <Link
            to="/contests"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            View Contests
          </Link>
        </div>
      </section>

      {/* Upcoming Contests */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Upcoming Contests
        </h2>
        {upcomingContests.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Starts In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingContests.map((contest) => (
                  <tr key={contest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`https://codeforces.com/contests`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-medium">
                        {contest.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {convertTime(contest.startTimeSeconds)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(contest.durationSeconds / 3600).toFixed(1)} hours
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No upcoming contests found</p>
        )}
      </section>

      {/* Recent Problems */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Problems
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recentProblems.map((problem) => (
            <div
              key={`${problem.contestId}-${problem.index}`}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Link
                to={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block">
                <h3 className="font-medium text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                  {problem.contestId}
                  {problem.index}. {problem.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {problem.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
