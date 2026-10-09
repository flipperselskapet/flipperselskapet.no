"use client";

import { useState } from "react";
import type { SelectRegistration } from "~/db/schema";
import { Badge, Button, Input, TableCell, TableRow } from "../ui";
import {
  markDeleted,
  togglePaid,
  toggleVerified,
  updateIfpaNumber,
} from "./actions";

interface Props {
  registration: SelectRegistration;
}

export function AdminRegistrationRow({ registration }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingIfpa, setIsEditingIfpa] = useState(false);
  const [ifpaNumber, setIfpaNumber] = useState(registration.ifpaNumber || "");

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

  async function handleSaveIfpa() {
    setIsLoading(true);
    const result = await updateIfpaNumber(registration.id, ifpaNumber.trim());
    setIsLoading(false);

    if (result.success) {
      setIsEditingIfpa(false);
    } else {
      alert(result.error || "Failed to update IFPA number");
    }
  }

  function handleCancelIfpa() {
    setIfpaNumber(registration.ifpaNumber || "");
    setIsEditingIfpa(false);
  }

  const tournaments = [];
  if (registration.mainTournament) tournaments.push("Main");
  if (registration.warmupTournament) tournaments.push("Warmup");
  if (registration.sideTournament) tournaments.push("Side");

  return (
    <TableRow>
      {/* Name */}
      <TableCell className="pl-6">
        <div className="font-medium">
          {registration.firstName} {registration.lastName}
        </div>
        <div className="text-xs text-(color:--muted-foreground)">
          ID: {registration.id} | Registered:{" "}
          {new Date(registration.createdAt).toLocaleDateString()}
        </div>
      </TableCell>

      {/* Contact */}
      <TableCell>
        <div>{registration.email}</div>
        <div className="text-xs text-(color:--muted-foreground)">
          {registration.phone}
        </div>
      </TableCell>

      {/* IFPA */}
      <TableCell>
        {isEditingIfpa ? (
          <div className="flex gap-1">
            <Input
              type="text"
              value={ifpaNumber}
              onChange={(e) => setIfpaNumber(e.target.value)}
              className="h-8 w-24"
              placeholder="IFPA #"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSaveIfpa}
              disabled={isLoading}
              title="Save"
            >
              ✓
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleCancelIfpa}
              disabled={isLoading}
              title="Cancel"
            >
              ✕
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="tabular-nums">
              {registration.ifpaNumber || (
                <span className="text-(color:--muted-foreground)">N/A</span>
              )}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditingIfpa(true)}
              title="Edit IFPA number"
            >
              ✎
            </Button>
          </div>
        )}
      </TableCell>

      {/* Tournaments */}
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {tournaments.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {registration.verifiedAt && <Badge>✓ Verified</Badge>}
          {registration.paidAt && (
            <Badge variant="outline" className="text-(color:--success)">
              ✓ Paid
            </Badge>
          )}
          {!registration.verifiedAt && !registration.paidAt && (
            <Badge variant="secondary">Pending</Badge>
          )}
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="pr-6">
        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant={registration.verifiedAt ? "outline" : "default"}
            onClick={handleToggleVerified}
            disabled={isLoading}
          >
            {registration.verifiedAt ? "Unverify" : "Verify"}
          </Button>

          <Button
            size="sm"
            variant={registration.paidAt ? "outline" : "secondary"}
            onClick={handleTogglePaid}
            disabled={isLoading}
          >
            {registration.paidAt ? "Unpaid" : "Mark Paid"}
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
