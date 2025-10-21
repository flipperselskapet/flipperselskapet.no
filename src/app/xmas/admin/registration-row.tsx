"use client";

import { useState } from "react";
import type { SelectRegistration } from "~/db/schema";
import { markDeleted, togglePaid, toggleVerified } from "./actions";

interface Props {
  registration: SelectRegistration;
}

export function AdminRegistrationRow({ registration }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggleVerified() {
    setIsLoading(true);
    await toggleVerified(registration.id);
    setIsLoading(false);
  }

  async function handleTogglePaid() {
    setIsLoading(true);
    await togglePaid(registration.id);
    setIsLoading(false);
  }

  async function handleDelete() {
    if (
      !confirm(
        `Are you sure you want to delete ${registration.firstName} ${registration.lastName}?`,
      )
    ) {
      return;
    }

    setIsLoading(true);
    await markDeleted(registration.id);
    setIsLoading(false);
  }

  const tournaments = [];
  if (registration.mainTournament) tournaments.push("Main");
  if (registration.warmupTournament) tournaments.push("Warmup");
  if (registration.sideTournament) tournaments.push("Side");

  return (
    <tr className="border-b border-slate-700/50 hover:bg-slate-800/30">
      {/* Name */}
      <td className="px-4 py-4">
        <div className="font-semibold text-gray-200">
          {registration.firstName} {registration.lastName}
        </div>
        <div className="text-xs text-gray-400">
          ID: {registration.id} | Registered:{" "}
          {new Date(registration.createdAt).toLocaleDateString()}
        </div>
      </td>

      {/* Contact */}
      <td className="px-4 py-4">
        <div className="text-sm">
          <div className="text-gray-300">{registration.email}</div>
          <div className="text-gray-400">{registration.phone}</div>
        </div>
      </td>

      {/* IFPA */}
      <td className="px-4 py-4">
        <div className="text-sm text-gray-300">
          {registration.ifpaNumber || (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      </td>

      {/* Tournaments */}
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1">
          {tournaments.map((t) => (
            <span
              key={t}
              className={`text-xs px-2 py-1 rounded ${
                t === "Main"
                  ? "bg-purple-900/50 text-purple-200"
                  : t === "Warmup"
                    ? "bg-cyan-900/50 text-cyan-200"
                    : "bg-pink-900/50 text-pink-200"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          {registration.verifiedAt && (
            <span className="text-xs px-2 py-1 rounded bg-green-900/50 text-green-200 inline-block">
              ✓ Verified
            </span>
          )}
          {registration.paidAt && (
            <span className="text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-200 inline-block">
              ✓ Paid
            </span>
          )}
          {!registration.verifiedAt && !registration.paidAt && (
            <span className="text-xs px-2 py-1 rounded bg-yellow-900/50 text-yellow-200 inline-block">
              Pending
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleToggleVerified}
            disabled={isLoading}
            className={`text-xs px-3 py-1 rounded transition-colors disabled:opacity-50 ${
              registration.verifiedAt
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-green-700 hover:bg-green-600 text-white"
            }`}
          >
            {registration.verifiedAt ? "Unverify" : "Verify"}
          </button>

          <button
            type="button"
            onClick={handleTogglePaid}
            disabled={isLoading}
            className={`text-xs px-3 py-1 rounded transition-colors disabled:opacity-50 ${
              registration.paidAt
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-blue-700 hover:bg-blue-600 text-white"
            }`}
          >
            {registration.paidAt ? "Unpaid" : "Mark Paid"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="text-xs px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition-colors disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
