"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { checkAdminAuth } from "../login-actions";

export async function toggleVerified(id: number) {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Get current value
    const [current] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, id))
      .limit(1);

    if (!current) {
      return { success: false, error: "Registration not found" };
    }

    // Toggle the value - set to current time if null, or null if set
    await db
      .update(registrations)
      .set({ verifiedAt: current.verifiedAt ? null : new Date() })
      .where(eq(registrations.id, id));

    // Revalidate all affected pages
    revalidatePath("/admin/xmas");
    revalidatePath("/xmas/players");
    revalidatePath("/xmas");
    return { success: true };
  } catch (error) {
    console.error("Error toggling verified status:", error);
    return { success: false, error: "Failed to update verification status" };
  }
}

export async function togglePaid(id: number) {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Get current value
    const [current] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, id))
      .limit(1);

    if (!current) {
      return { success: false, error: "Registration not found" };
    }

    // Toggle the value - set to current time if null, or null if set
    await db
      .update(registrations)
      .set({ paidAt: current.paidAt ? null : new Date() })
      .where(eq(registrations.id, id));

    // Revalidate admin page (paid status doesn't affect public pages)
    revalidatePath("/admin/xmas");
    return { success: true };
  } catch (error) {
    console.error("Error toggling paid status:", error);
    return { success: false, error: "Failed to update payment status" };
  }
}

export async function markDeleted(id: number) {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Soft delete by setting deletedAt timestamp
    await db
      .update(registrations)
      .set({ deletedAt: new Date() })
      .where(eq(registrations.id, id));

    // Revalidate all affected pages
    revalidatePath("/admin/xmas");
    revalidatePath("/xmas/players");
    revalidatePath("/xmas");
    return { success: true };
  } catch (error) {
    console.error("Error deleting registration:", error);
    return { success: false, error: "Failed to delete registration" };
  }
}

export async function updateIfpaNumber(id: number, ifpaNumber: string) {
  if (!(await checkAdminAuth())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Get current registration
    const [current] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, id))
      .limit(1);

    if (!current) {
      return { success: false, error: "Registration not found" };
    }

    // Update IFPA number (empty string becomes null)
    await db
      .update(registrations)
      .set({ ifpaNumber: ifpaNumber || null })
      .where(eq(registrations.id, id));

    // Revalidate affected pages
    revalidatePath("/admin/xmas");
    revalidatePath("/xmas/players");
    return { success: true };
  } catch (error) {
    console.error("Error updating IFPA number:", error);
    return { success: false, error: "Failed to update IFPA number" };
  }
}
