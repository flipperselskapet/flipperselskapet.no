import { z } from "zod";

const text = (label: string) =>
  z.string().trim().min(1, `${label} is required`).max(200);

const machineSchema = z.object({
  name: text("Name"),
  manufacturer: text("Manufacturer"),
  year: z
    .string()
    .trim()
    .regex(/^\d{1,4}$/, "Year must be a whole number (0 if unknown)")
    .transform(Number)
    .pipe(z.number().max(2100, "Year must be 2100 or earlier")),
  ipdbId: z.string().trim().regex(/^\d+$/, "IPDB ID must be a number"),
  ipdbUrl: z.union([z.literal(""), z.url("IPDB URL must be a valid URL")]),
  ipdbRating: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        (!Number.isNaN(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 10),
      "Rating must be a number between 0 and 10",
    ),
});

export type MachineInput = {
  name: string;
  manufacturer: string;
  year: number;
  ipdbId: string;
  ipdbUrl: string;
  /** Out of 10; null while the machine has no IPDB rating yet */
  ipdbRating: string | null;
};

export type ParsedMachine =
  | { success: true; data: MachineInput }
  | { success: false; error: string };

const FIELDS = [
  "name",
  "manufacturer",
  "year",
  "ipdbId",
  "ipdbUrl",
  "ipdbRating",
] as const;

export function parseMachineFormData(formData: FormData): ParsedMachine {
  const raw = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  );
  const parsed = machineSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid machine data",
    };
  }

  const { ipdbUrl, ipdbRating, ...rest } = parsed.data;
  return {
    success: true,
    data: {
      ...rest,
      // Blank link: use the standard IPDB page for this machine
      ipdbUrl: ipdbUrl || `https://www.ipdb.org/machine.cgi?id=${rest.ipdbId}`,
      ipdbRating: ipdbRating === "" ? null : String(Number(ipdbRating)),
    },
  };
}
