import { useEffect, useState } from "react";
import { useContestStore } from "@/store/contestStore";
import { convertTime } from "@/lib/dateTime";

function TableView() {
  const { getContests, contests } = useContestStore();
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getContests();
      setLoading(false);
    };
    fetchData();
  }, [getContests]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedContests = [...contests].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getStatusColor = (phase) => {
    switch (phase) {
      case "BEFORE":
        return "bg-emerald-100 text-emerald-800";
      case "FINISHED":
        return "bg-gray-100 text-gray-800";
      case "CODING":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const getTypeColor = (type) => {
    return type === "CF"
      ? "bg-indigo-100 text-indigo-800"
      : "bg-purple-100 text-purple-800";
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-14 mb-2 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => requestSort("id")}>
                  <div className="flex items-center">
                    Contest ID
                    {sortConfig.key === "id" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => requestSort("name")}>
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === "name" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => requestSort("startTimeSeconds")}>
                  <div className="flex items-center">
                    Start Time
                    {sortConfig.key === "startTimeSeconds" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => requestSort("durationSeconds")}>
                  <div className="flex items-center">
                    Duration
                    {sortConfig.key === "durationSeconds" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedContests.map((contest) => (
                <tr
                  key={contest.id}
                  className={`transition-all hover:bg-gray-50 ${
                    contest.phase === "BEFORE"
                      ? "bg-emerald-50 hover:bg-emerald-400"
                      : "hover:bg-emerald-400"
                  }`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contest.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <a
                      href={`https://codeforces.com/contest/${contest.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 hover:underline transition-colors">
                      {contest.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {convertTime(contest.startTimeSeconds)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                        contest.type
                      )}`}>
                      {contest.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        contest.phase
                      )}`}>
                      {contest.phase.replace("_", " ").toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(contest.durationSeconds / 3600).toFixed(1)} hours
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {contests.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            No contests available at the moment
          </div>
        )}
      </div>
    </div>
  );
}

export default TableView;
