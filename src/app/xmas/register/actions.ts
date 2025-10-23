"use server";

import { revalidatePath } from "next/cache";
import { env } from "~/env";
import { sendSlackNotification } from "./slack";

export async function submitRegistration(formData: FormData) {
  try {
    // Verify Turnstile token
    const turnstileToken = formData.get("turnstileToken") as string;

    if (!turnstileToken) {
      return {
        success: false,
        error: "Captcha verification required",
      };
    }

    // Validate turnstile token with Cloudflare
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return {
        success: false,
        error: "Captcha verification failed. Please try again.",
      };
    }

    // Extract form data
    const registration = {
      // Tournament selections
      mainTournament: formData.get("mainTournament") === "true",
      warmupTournament: formData.get("warmupTournament") === "true",
      sideTournament: formData.get("sideTournament") === "true",

      // Personal information
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      ifpaNumber: (formData.get("ifpaNumber") as string) || null,

      // Metadata
      submittedAt: new Date().toISOString(),
    };

    // Validate required fields
    if (
      !registration.firstName ||
      !registration.lastName ||
      !registration.email ||
      !registration.phone
    ) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    // Validate at least one tournament is selected
    if (
      !registration.mainTournament &&
      !registration.warmupTournament &&
      !registration.sideTournament
    ) {
      return {
        success: false,
        error: "Please select at least one tournament to participate in",
      };
    }

    // Save to database
    const { db } = await import("~/db");
    const { registrations } = await import("~/db/schema");
    const { isNull, count } = await import("drizzle-orm");

    // Check if we should auto-verify this registration
    // Count current non-deleted registrations (regardless of verification status)
    const [countResult] = await db
      .select({ count: count() })
      .from(registrations)
      .where(isNull(registrations.deletedAt));

    const currentCount = countResult?.count ?? 0;
    const shouldAutoVerify = currentCount < env.AUTO_VERIFY_LIMIT;

    await db.insert(registrations).values({
      mainTournament: registration.mainTournament,
      warmupTournament: registration.warmupTournament,
      sideTournament: registration.sideTournament,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      ifpaNumber: registration.ifpaNumber,
      verifiedAt: shouldAutoVerify ? new Date() : null,
    });

    // Log to console
    console.log("=== XMAS Tournament Registration ===");
    console.log("Submitted at:", registration.submittedAt);
    console.log("\nTournaments:");
    console.log(
      "  - Main Tournament (Saturday):",
      registration.mainTournament ? "✓" : "✗",
    );
    console.log(
      "  - Warmup Tournament (Friday):",
      registration.warmupTournament ? "✓" : "✗",
    );
    console.log(
      "  - Side Tournament (Saturday evening):",
      registration.sideTournament ? "✓" : "✗",
    );
    console.log("\nParticipant Information:");
    console.log(
      "  Name:",
      `${registration.firstName} ${registration.lastName}`,
    );
    console.log("  Email:", registration.email);
    console.log("  Phone:", registration.phone);
    console.log("  IFPA Number:", registration.ifpaNumber || "(not provided)");
    console.log("\nVerification:");
    console.log("  Auto-verified:", shouldAutoVerify ? "✓" : "✗");
    console.log(
      "  Registration count:",
      `${currentCount + 1}/${env.AUTO_VERIFY_LIMIT}`,
    );
    console.log("====================================\n");

    // Send Slack notification (non-blocking, errors are caught internally)
    sendSlackNotification({
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      ifpaNumber: registration.ifpaNumber,
      mainTournament: registration.mainTournament,
      warmupTournament: registration.warmupTournament,
      sideTournament: registration.sideTournament,
      autoVerified: shouldAutoVerify,
      registrationCount: currentCount + 1,
    }).catch((error) => {
      // Extra safety: catch any errors that might escape from sendSlackNotification
      console.error("Unexpected error in Slack notification:", error);
    });

    // Revalidate player list and xmas page if auto-verified
    if (shouldAutoVerify) {
      revalidatePath("/xmas/players");
      revalidatePath("/xmas");
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
