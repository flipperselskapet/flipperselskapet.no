"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "../ui";
import { createMachine, deleteMachine, updateMachine } from "./actions";

export type MachineFormValues = {
  id: number;
  name: string;
  manufacturer: string;
  year: number;
  ipdbId: string;
  ipdbUrl: string;
  ipdbRating: string | null;
};

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-(color:--muted-foreground)">{hint}</p>
      )}
    </div>
  );
}

export function MachineForm({ machine }: { machine?: MachineFormValues }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  // Tracks the typed ID so the link placeholder shows the link that will be used
  const [ipdbId, setIpdbId] = useState(machine?.ipdbId ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = machine
      ? await updateMachine(machine.id, formData)
      : await createMachine(formData);

    if (result.success) {
      router.push("/admin/machines");
      router.refresh();
      return;
    }

    setError(result.error);
    setIsSubmitting(false);
  }

  async function handleDelete() {
    if (
      !machine ||
      !confirm(`Delete ${machine.name}? This cannot be undone.`)
    ) {
      return;
    }

    setIsSubmitting(true);
    const result = await deleteMachine(machine.id);

    if (result.success) {
      router.push("/admin/machines");
      router.refresh();
      return;
    }

    setError(result.error);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field id="name" label="Name">
          <Input
            id="name"
            name="name"
            required
            defaultValue={machine?.name}
            placeholder="AC/DC"
          />
        </Field>
        <Field id="manufacturer" label="Manufacturer">
          <Input
            id="manufacturer"
            name="manufacturer"
            required
            defaultValue={machine?.manufacturer}
            placeholder="Stern"
          />
        </Field>
        <Field id="year" label="Year" hint="Use 0 if the year is unknown.">
          <Input
            id="year"
            name="year"
            required
            inputMode="numeric"
            defaultValue={machine?.year}
            placeholder="2012"
          />
        </Field>
        <Field
          id="ipdbId"
          label="IPDB ID"
          hint="The number in the machine's ipdb.org address."
        >
          <Input
            id="ipdbId"
            name="ipdbId"
            required
            inputMode="numeric"
            defaultValue={machine?.ipdbId}
            onChange={(e) => setIpdbId(e.target.value.trim())}
            placeholder="5767"
          />
        </Field>
        <Field
          id="ipdbUrl"
          label="IPDB link (optional)"
          hint="Leave blank to use the standard ipdb.org page for the ID."
        >
          <Input
            id="ipdbUrl"
            name="ipdbUrl"
            type="url"
            defaultValue={machine?.ipdbUrl}
            placeholder={`https://www.ipdb.org/machine.cgi?id=${ipdbId || "…"}`}
          />
        </Field>
        <Field
          id="ipdbRating"
          label="IPDB rating (optional)"
          hint="Out of 10. Leave blank if it has no rating yet."
        >
          <Input
            id="ipdbRating"
            name="ipdbRating"
            inputMode="decimal"
            defaultValue={
              machine?.ipdbRating ? String(Number(machine.ipdbRating)) : ""
            }
            placeholder="7.9"
          />
        </Field>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-(color:--destructive) px-3 py-2 text-sm text-(color:--destructive)"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {machine ? "Save changes" : "Add machine"}
        </Button>
        <Button
          variant="outline"
          disabled={isSubmitting}
          onClick={() => router.push("/admin/machines")}
        >
          Cancel
        </Button>
        {machine && (
          <Button
            variant="destructive"
            className="ml-auto"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
