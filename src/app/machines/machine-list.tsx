"use client";

import { useMemo, useState } from "react";
import type { Machine } from "~/data/machines";

type SortColumn = "name" | "manufacturer" | "year" | "rating";
type SortDirection = "asc" | "desc";

interface MachineListProps {
  machines: Machine[];
}

export default function MachineList({ machines }: MachineListProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedMachines = useMemo(() => {
    const sorted = [...machines].sort((a, b) => {
      let compareA: string | number;
      let compareB: string | number;

      switch (sortColumn) {
        case "name":
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case "manufacturer":
          compareA = a.manufacturer.toLowerCase();
          compareB = b.manufacturer.toLowerCase();
          break;
        case "year":
          compareA = a.year;
          compareB = b.year;
          break;
        case "rating":
          // Extract numeric rating for sorting (handle "TBD" and "/10" suffix)
          compareA = a.rating === "TBD" ? 0 : Number.parseFloat(a.rating);
          compareB = b.rating === "TBD" ? 0 : Number.parseFloat(b.rating);
          break;
        default:
          return 0;
      }

      if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
      if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [machines, sortColumn, sortDirection]);

  const handleHeaderClick = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column with ascending as default
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortIndicator = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return null;
    return (
      <span className="ml-1 inline-block">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  if (machines.length === 0) {
    return <p className="text-gray-400 italic">Maskinliste kommer snart...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-cyan-500/50">
            <th className="py-3 px-4 text-cyan-300 font-bold">
              <button
                type="button"
                onClick={() => handleHeaderClick("name")}
                className="hover:text-cyan-100 transition-colors cursor-pointer"
              >
                Maskin
                <SortIndicator column="name" />
              </button>
            </th>
            <th className="py-3 px-4 text-cyan-300 font-bold hidden sm:table-cell">
              <button
                type="button"
                onClick={() => handleHeaderClick("manufacturer")}
                className="hover:text-cyan-100 transition-colors cursor-pointer"
              >
                Produsent
                <SortIndicator column="manufacturer" />
              </button>
            </th>
            <th className="py-3 px-4 text-cyan-300 font-bold hidden md:table-cell">
              <button
                type="button"
                onClick={() => handleHeaderClick("year")}
                className="hover:text-cyan-100 transition-colors cursor-pointer"
              >
                År
                <SortIndicator column="year" />
              </button>
            </th>
            <th className="py-3 px-4 text-cyan-300 font-bold hidden lg:table-cell">
              <button
                type="button"
                onClick={() => handleHeaderClick("rating")}
                className="hover:text-cyan-100 transition-colors cursor-pointer"
              >
                Rating
                <SortIndicator column="rating" />
              </button>
            </th>
            <th className="py-3 px-4 text-cyan-300 font-bold">IPDB</th>
          </tr>
        </thead>
        <tbody>
          {sortedMachines.map((machine) => (
            <tr
              key={machine.ipdbId}
              className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="text-gray-200 font-semibold">
                  {machine.name}
                </div>
                <div className="text-gray-400 text-sm mt-1 lg:hidden">
                  <span className="sm:hidden">
                    {machine.manufacturer}
                    {" • "}
                  </span>
                  <span className="md:hidden">
                    {machine.year !== 0 ? machine.year : "TBD"}
                    {" • "}
                  </span>
                  {machine.rating}
                </div>
              </td>
              <td className="py-3 px-4 text-gray-300 hidden sm:table-cell">
                {machine.manufacturer}
              </td>
              <td className="py-3 px-4 text-gray-300 hidden md:table-cell">
                {machine.year !== 0 ? machine.year : "TBD"}
              </td>
              <td className="py-3 px-4 text-gray-300 hidden lg:table-cell">
                {machine.rating}
              </td>
              <td className="py-3 px-4">
                {machine.ipdbUrl !== "#" ? (
                  <a
                    href={machine.ipdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-200 underline text-sm"
                  >
                    →
                  </a>
                ) : (
                  <span className="text-gray-600 text-sm">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-400 text-sm mt-4 text-center">
        Total: {machines.length} maskiner
      </p>
    </div>
  );
}
