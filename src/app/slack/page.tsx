"use client";

import { useEffect } from "react";

export default function Slack() {
  useEffect(() => {
    window.location.href =
      "https://join.slack.com/t/flipperselskapet/shared_invite/enQtODQ0ODU5MDE1MjY2LWZjYzhlMzY2MzI2MzAwODE1Njk4Y2M2Y2VkY2ZjNDYwNjA3N2M0NmYyYWE2Y2VhODM3NjE5ZDc4ZDBlNjI1OWI";
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg">Redirecting to Slack...</p>
    </div>
  );
}
