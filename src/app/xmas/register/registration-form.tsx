"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { type Accent, Insert } from "~/components/em";
import { env } from "~/env";
import { submitRegistration } from "./actions";

const tournaments: {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  accent: Accent;
}[] = [
  {
    id: "warmup-tournament",
    name: "warmupTournament",
    title: "XMAS Matchplay Open Warmup 2026",
    description: "Format TBD",
    date: "Friday, December 4th",
    accent: "teal",
  },
  {
    id: "main-tournament",
    name: "mainTournament",
    title: "XMAS Matchplay Open Main 2026",
    description: "Qualifications (group matchplay) Saturday, finals Sunday",
    date: "Saturday, December 5th – Sunday, December 6th",
    accent: "blue",
  },
  {
    id: "side-tournament",
    name: "sideTournament",
    title: "XMAS Matchplay Open Side 2026",
    description: "Format TBA",
    date: "Saturday, December 5th",
    accent: "red",
  },
];

const fields: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  hint?: string;
}[] = [
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+47 123 45 678",
    required: true,
    hint: "Include country code for international numbers",
  },
  {
    id: "ifpaNumber",
    label: "IFPA Number",
    type: "text",
    placeholder: "12345",
    required: false,
    hint: "Your International Flipper Pinball Association player number, if you have one.",
  },
];

const headingClass =
  "font-label font-bold uppercase tracking-wide text-2xl text-em-teal mb-4";

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold mb-1">
      {label}{" "}
      {required ? (
        <span className="text-em-red">*</span>
      ) : (
        <span className="font-normal opacity-70">(Optional)</span>
      )}
    </label>
  );
}

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Check if turnstile token is present
    if (!turnstileToken) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the captcha verification.",
      });
      setIsSubmitting(false);
      return;
    }

    // Client-side validation: Check if at least one tournament is selected
    const mainTournament = formData.get("mainTournament") === "true";
    const warmupTournament = formData.get("warmupTournament") === "true";
    const sideTournament = formData.get("sideTournament") === "true";

    if (!mainTournament && !warmupTournament && !sideTournament) {
      setSubmitStatus({
        type: "error",
        message: "Please select at least one tournament to participate in",
      });
      setIsSubmitting(false);
      setTurnstileToken(null);
      turnstileRef.current?.reset();
      return;
    }

    // Add turnstile token to form data
    formData.append("turnstileToken", turnstileToken);

    try {
      const result = await submitRegistration(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Registration submitted successfully! We'll be in touch soon.",
        });
        // Reset form only on success
        formElement.reset();
        setTurnstileToken(null);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
        // Reset captcha on error so user can retry
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit registration. Please try again.",
      });
      // Reset captcha on error so user can retry
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Tournament Selection */}
      <div>
        <h2 className={headingClass}>Tournament Selection</h2>
        <p className="text-sm mb-4">
          Select one or more tournaments. Leftovers on Sunday, December 6th
          require no registration – sign up on the spot.
        </p>

        <div className="space-y-4">
          {tournaments.map((t) => (
            <label
              key={t.id}
              htmlFor={t.id}
              className="flex items-start gap-3 bg-white/70 border-2 border-em-ink rounded-xl p-4 cursor-pointer transition-colors hover:bg-white has-checked:bg-em-yellow/40 has-checked:shadow-[4px_4px_0_var(--color-em-ink)]"
            >
              <input
                type="checkbox"
                id={t.id}
                name={t.name}
                value="true"
                className="mt-1 h-5 w-5 accent-em-teal"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-2 font-label font-bold uppercase tracking-wide">
                  <Insert accent={t.accent} className="h-3.5 w-3.5" />
                  {t.title}
                  <span className="font-normal normal-case tracking-normal text-sm opacity-70">
                    Price TBD
                  </span>
                </div>
                <p className="text-sm mt-1">{t.description}</p>
                <p className="text-xs mt-1 opacity-70">{t.date}</p>
              </div>
            </label>
          ))}
        </div>

        <p className="mt-4 text-xs opacity-70">
          Prices and payment details: TBD
        </p>
      </div>

      {/* Personal Information */}
      <div>
        <h2 className={headingClass}>Personal Information</h2>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <FieldLabel htmlFor="firstName" label="First Name" required />
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="em-input"
                placeholder="Your first name"
              />
            </div>
            <div>
              <FieldLabel htmlFor="lastName" label="Last Name" required />
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="em-input"
                placeholder="Your last name"
              />
            </div>
          </div>

          {fields.map((f) => (
            <div key={f.id}>
              <FieldLabel
                htmlFor={f.id}
                label={f.label}
                required={f.required}
              />
              <input
                type={f.type}
                id={f.id}
                name={f.id}
                required={f.required}
                className="em-input"
                placeholder={f.placeholder}
              />
              {f.hint && <p className="text-xs mt-1 opacity-70">{f.hint}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Captcha */}
      <div className="flex justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          options={{ theme: "light" }}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
        />
      </div>

      {/* Error Status (inline) */}
      {submitStatus && submitStatus.type === "error" && (
        <div className="p-4 rounded-xl bg-em-red text-em-paper border-2 border-em-ink">
          <p className="font-semibold">{submitStatus.message}</p>
        </div>
      )}

      {/* Success Modal */}
      {submitStatus && submitStatus.type === "success" && (
        <div className="fixed inset-0 bg-em-ink/80 flex items-center justify-center z-50 p-4">
          <div className="em-panel p-8 max-w-md w-full text-center">
            <div className="em-bumper h-20 w-20 mx-auto mb-4">
              <span className="font-display text-3xl">✓</span>
            </div>
            <h2 className="font-label font-bold uppercase tracking-wide text-3xl text-em-teal mb-4">
              Registration Successful!
            </h2>
            <p className="mb-6">{submitStatus.message}</p>
            <div className="space-y-4">
              <a href="/xmas" className="em-button w-full">
                Back to Tournament Information
              </a>
              <a
                href="/xmas/players"
                className="block font-semibold text-em-blue underline hover:text-em-red"
              >
                View Registered Players
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="em-button w-full text-lg"
        >
          {isSubmitting ? "Submitting..." : "Register for Tournament"}
        </button>

        <p className="text-xs text-center mt-3 opacity-70">
          <span className="text-em-red">*</span> Required fields
        </p>
      </div>
    </form>
  );
}
