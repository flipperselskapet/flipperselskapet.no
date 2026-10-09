"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { Rivet } from "~/components/saw";
import { env } from "~/env";
import { submitRegistration } from "./actions";
import { PACKAGE_PRICE, TOURNAMENT_PRICES } from "./prices";

const tournaments: {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  price: number;
}[] = [
  {
    id: "warmup-tournament",
    name: "warmupTournament",
    title: "XMAS Matchplay Open Warmup 2026",
    description: "Format TBD",
    date: "Friday, December 4th",
    price: TOURNAMENT_PRICES.warmupTournament,
  },
  {
    id: "main-tournament",
    name: "mainTournament",
    title: "XMAS Matchplay Open Main 2026",
    description: "Qualifications (group matchplay) Saturday, finals Sunday",
    date: "Saturday, December 5th – Sunday, December 6th",
    price: TOURNAMENT_PRICES.mainTournament,
  },
  {
    id: "side-tournament",
    name: "sideTournament",
    title: "XMAS Matchplay Open Side 2026",
    description: "Format TBA",
    date: "Saturday, December 5th",
    price: TOURNAMENT_PRICES.sideTournament,
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
  "font-label font-bold uppercase tracking-wide text-2xl text-saw-blood-light mb-4";

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
        <span className="text-saw-blood-light">*</span>
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
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const selectedTournaments = tournaments.filter((t) => selected[t.name]);
  const fullPrice = selectedTournaments.reduce((sum, t) => sum + t.price, 0);
  const isPackageDeal = selectedTournaments.length === tournaments.length;
  const total = isPackageDeal ? PACKAGE_PRICE : fullPrice;

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
        setSelected({});
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
              className="flex items-start gap-3 bg-black/40 border border-saw-steel rounded-sm p-4 cursor-pointer transition-colors hover:bg-black/60 has-checked:border-saw-blood-light has-checked:bg-saw-blood-dark/40"
            >
              <input
                type="checkbox"
                id={t.id}
                name={t.name}
                value="true"
                onChange={(e) =>
                  setSelected((prev) => ({
                    ...prev,
                    [t.name]: e.target.checked,
                  }))
                }
                className="mt-1 h-5 w-5 accent-saw-blood"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-2 font-label font-bold uppercase tracking-wide">
                  <Rivet />
                  {t.title}
                  <span className="font-normal normal-case tracking-normal text-sm opacity-70">
                    {t.price} NOK
                  </span>
                </div>
                <p className="text-sm mt-1">{t.description}</p>
                <p className="text-xs mt-1 opacity-70">{t.date}</p>
              </div>
            </label>
          ))}
        </div>

        {total > 0 ? (
          <div className="saw-note px-5 py-4 mt-4" aria-live="polite">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-label font-bold uppercase tracking-wide">
                  Total to pay on arrival
                </p>
                {isPackageDeal && (
                  <p className="text-sm font-bold">
                    Package deal — you save {fullPrice - PACKAGE_PRICE} NOK!
                  </p>
                )}
              </div>
              <div className="text-right">
                {isPackageDeal && (
                  <p className="text-sm line-through opacity-60">
                    {fullPrice} NOK
                  </p>
                )}
                <p className="font-grunge text-4xl leading-none">{total} NOK</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm">
            <strong>Package deal:</strong> sign up for all three tournaments for{" "}
            {PACKAGE_PRICE} NOK. Leftovers is free for Main players.
          </p>
        )}
        <p className="mt-2 text-xs opacity-70">
          Payment: Norwegian players pay with Vipps on arrival. International
          players: we'll figure something out.
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
                className="saw-input"
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
                className="saw-input"
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
                className="saw-input"
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
          options={{ theme: "dark" }}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
        />
      </div>

      {/* Error Status (inline) */}
      {submitStatus && submitStatus.type === "error" && (
        <div className="p-4 rounded-sm bg-saw-blood-dark text-saw-bone border border-saw-blood-light">
          <p className="font-semibold">{submitStatus.message}</p>
        </div>
      )}

      {/* Success Modal */}
      {submitStatus && submitStatus.type === "success" && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="saw-panel p-8 max-w-md w-full text-center">
            <div className="font-grunge text-6xl text-saw-blood-light mb-4">
              ✓
            </div>
            <h2 className="font-label font-bold uppercase tracking-wide text-3xl text-saw-blood-light mb-4">
              Registration Successful!
            </h2>
            <p className="mb-6">{submitStatus.message}</p>
            <div className="space-y-4">
              <a href="/xmas" className="saw-button w-full">
                Back to Tournament Information
              </a>
              <a
                href="/xmas/players"
                className="block font-semibold text-saw-bone underline decoration-saw-blood-light underline-offset-4 hover:text-saw-blood-light"
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
          className="saw-button w-full text-lg"
        >
          {isSubmitting ? "Submitting..." : "Register for Tournament"}
        </button>

        <p className="text-xs text-center mt-3 opacity-70">
          <span className="text-saw-blood-light">*</span> Required fields
        </p>
      </div>
    </form>
  );
}
