"use client";

import { useState } from "react";
import {
  Button,
  buttonStyles,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";

interface Props {
  emails: string[];
}

// Lets the admin email every verified (accepted) player at once: a mailto
// link with everyone in Bcc, so players don't see each other's addresses,
// plus a button that copies the addresses for pasting into any mail client.
export function EmailPlayers({ emails }: Props) {
  const [copied, setCopied] = useState(false);

  if (emails.length === 0) {
    return null;
  }

  const mailto = `mailto:?bcc=${emails.map(encodeURIComponent).join(",")}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(emails.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email players</CardTitle>
        <CardDescription>
          {emails.length} verified {emails.length === 1 ? "player" : "players"}.
          The email link puts everyone in Bcc. If your mail app drops some
          addresses, copy them and paste into Bcc instead.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <a href={mailto} className={buttonStyles()}>
          ✉ Email all verified players
        </a>
        <Button variant="outline" onClick={handleCopy}>
          {copied ? "✓ Copied" : "Copy addresses"}
        </Button>
      </CardContent>
    </Card>
  );
}
