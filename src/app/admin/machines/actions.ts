"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { machines } from "~/db/schema";
import { checkAdminAuth } from "../login-actions";
import { parseMachineFormData } from "./validation";

type ActionResult = { success: true } | { success: false; error: string };

function revalidateMachinePages() {
  revalidatePath("/machines");
  revalidatePath("/admin/machines");
  revalidatePath("/admin");
}

function isUniqueViolation(error: unknown) {
  const e = error as { code?: string; cause?: { code?: string } } | null;
  return e?.code === "23505" || e?.cause?.code === "23505";
}

const DUPLICATE_ERROR = "A machine with that IPDB ID already exists";

export async function createMachine(formData: FormData): Promise<ActionResult> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = parseMachineFormData(formData);
  if (!parsed.success) {
    return parsed;
  }

  try {
    await db.insert(machines).values(parsed.data);
    revalidateMachinePages();
    return { success: true };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { success: false, error: DUPLICATE_ERROR };
    }
    console.error("Error creating machine:", error);
    return { success: false, error: "Failed to create machine" };
  }
}

export async function updateMachine(
  id: number,
  formData: FormData,
): Promise<ActionResult> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = parseMachineFormData(formData);
  if (!parsed.success) {
    return parsed;
  }

  try {
    const updated = await db
      .update(machines)
      .set(parsed.data)
      .where(eq(machines.id, id))
      .returning({ id: machines.id });

    if (updated.length === 0) {
      return { success: false, error: "Machine not found" };
    }

    revalidateMachinePages();
    return { success: true };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { success: false, error: DUPLICATE_ERROR };
    }
    console.error("Error updating machine:", error);
    return { success: false, error: "Failed to update machine" };
  }
}

export async function deleteMachine(id: number): Promise<ActionResult> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.delete(machines).where(eq(machines.id, id));
    revalidateMachinePages();
    return { success: true };
  } catch (error) {
    console.error("Error deleting machine:", error);
    return { success: false, error: "Failed to delete machine" };
  }
}
