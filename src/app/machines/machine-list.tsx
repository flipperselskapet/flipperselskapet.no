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
    return (
      <p className="font-type text-saw-ash">Maskinliste kommer snart...</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="font-label uppercase tracking-wide text-sm bg-black/60 text-saw-blood-light border-b border-saw-blood">
          <tr>
            <th className="py-3 px-4">
              <button
                type="button"
                onClick={() => handleHeaderClick("name")}
                className="uppercase tracking-wide hover:text-saw-bone transition-colors cursor-pointer"
              >
                Maskin
                <SortIndicator column="name" />
              </button>
            </th>
            <th className="py-3 px-4 font-bold hidden sm:table-cell">
              <button
                type="button"
                onClick={() => handleHeaderClick("manufacturer")}
                className="uppercase tracking-wide hover:text-saw-bone transition-colors cursor-pointer"
              >
                Produsent
                <SortIndicator column="manufacturer" />
              </button>
            </th>
            <th className="py-3 px-4 font-bold hidden md:table-cell">
              <button
                type="button"
                onClick={() => handleHeaderClick("year")}
                className="uppercase tracking-wide hover:text-saw-bone transition-colors cursor-pointer"
              >
                År
                <SortIndicator column="year" />
              </button>
            </th>
            <th className="py-3 px-4 font-bold hidden lg:table-cell">
              <button
                type="button"
                onClick={() => handleHeaderClick("rating")}
                className="uppercase tracking-wide hover:text-saw-bone transition-colors cursor-pointer"
              >
                Rating
                <SortIndicator column="rating" />
              </button>
            </th>
            <th className="py-3 px-4">IPDB</th>
          </tr>
        </thead>
        <tbody>
          {sortedMachines.map((machine) => (
            <tr
              key={machine.ipdbId}
              className="border-b border-dashed border-saw-steel last:border-0 hover:bg-saw-blood-dark/30 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="font-semibold">{machine.name}</div>
                <div className="text-sm mt-1 text-saw-ash lg:hidden">
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
              <td className="py-3 px-4 hidden sm:table-cell">
                {machine.manufacturer}
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                {machine.year !== 0 ? machine.year : "TBD"}
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
                {machine.rating}
              </td>
              <td className="py-3 px-4">
                {machine.ipdbUrl !== "#" ? (
                  <a
                    href={machine.ipdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-saw-bone underline decoration-saw-blood-light decoration-2 underline-offset-4 hover:text-saw-blood-light"
                  >
                    →
                  </a>
                ) : (
                  <span className="opacity-40">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-label uppercase tracking-wide text-sm mt-4 text-center text-saw-ash">
        Total: {machines.length} maskiner
      </p>
    </div>
  );
}
