"use server";

import { env } from "~/env";

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
      }
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
      ifpaNumber: formData.get("ifpaNumber") as string || null,

      // Metadata
      submittedAt: new Date().toISOString(),
    };

    // Validate required fields
    if (!registration.firstName || !registration.lastName || !registration.email || !registration.phone) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    // Save to database
    const { db } = await import("~/db");
    const { registrations } = await import("~/db/schema");

    await db.insert(registrations).values({
      mainTournament: registration.mainTournament,
      warmupTournament: registration.warmupTournament,
      sideTournament: registration.sideTournament,
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      ifpaNumber: registration.ifpaNumber,
    });

    // Log to console
    console.log("=== XMAS Tournament Registration ===");
    console.log("Submitted at:", registration.submittedAt);
    console.log("\nTournaments:");
    console.log("  - Main Tournament (Saturday):", registration.mainTournament ? "✓" : "✗");
    console.log("  - Warmup Tournament (Friday):", registration.warmupTournament ? "✓" : "✗");
    console.log("  - Side Tournament (Saturday evening):", registration.sideTournament ? "✓" : "✗");
    console.log("\nParticipant Information:");
    console.log("  Name:", `${registration.firstName} ${registration.lastName}`);
    console.log("  Email:", registration.email);
    console.log("  Phone:", registration.phone);
    console.log("  IFPA Number:", registration.ifpaNumber || "(not provided)");
    console.log("====================================\n");

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
