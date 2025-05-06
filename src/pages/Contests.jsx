import React from "react";
import TableView from "@/components/homepage/table/TableView.jsx";

function Contests() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Recent Contests
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Browse through upcoming and past programming contests from Codeforces
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <TableView />
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Data sourced from Codeforces API • Updated in real-time</p>
      </div>
    </div>
  );
}

export default Contests;
