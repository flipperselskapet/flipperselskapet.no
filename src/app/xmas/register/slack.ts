import { env } from "~/env";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ifpaNumber: string | null;
  mainTournament: boolean;
  warmupTournament: boolean;
  sideTournament: boolean;
  autoVerified: boolean;
  registrationCount: number;
}

/**
 * Sends a notification to Slack when a new registration is received.
 * This function is non-blocking and will not throw errors.
 * If Slack webhook is not configured, it silently returns.
 */
export async function sendSlackNotification(
  data: RegistrationData,
): Promise<void> {
  try {
    // Skip if Slack webhook is not configured
    if (!env.SLACK_WEBHOOK_URL) {
      console.log("Slack webhook not configured, skipping notification");
      return;
    }

    // Build tournament list
    const tournaments: string[] = [];
    if (data.mainTournament) tournaments.push("Main Tournament (Saturday)");
    if (data.warmupTournament) tournaments.push("Warmup Tournament (Friday)");
    if (data.sideTournament)
      tournaments.push("Side Tournament (Saturday evening)");

    // Format the Slack message
    const message = {
      text: "New XMAS Tournament Registration",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🎄 New XMAS Tournament Registration",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${data.firstName} ${data.lastName}`,
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${data.email}`,
            },
            {
              type: "mrkdwn",
              text: `*Phone:*\n${data.phone}`,
            },
            {
              type: "mrkdwn",
              text: `*IFPA #:*\n${data.ifpaNumber || "Not provided"}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Tournaments:*\n${tournaments.map((t) => `• ${t}`).join("\n")}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `${data.autoVerified ? "✅ Auto-verified" : "⏳ Awaiting verification"} | Registration #${data.registrationCount}`,
            },
          ],
        },
      ],
    };

    // Send to Slack
    const response = await fetch(env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error(
        "Failed to send Slack notification:",
        response.status,
        response.statusText,
      );
    } else {
      console.log("Slack notification sent successfully");
    }
  } catch (error) {
    // Log error but don't throw - registration should always succeed
    console.error("Error sending Slack notification:", error);
  }
}
