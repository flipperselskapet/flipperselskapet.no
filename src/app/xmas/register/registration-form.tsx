"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { env } from "~/env";
import { submitRegistration } from "./actions";

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  // Track tournament selections for price calculation
  const [selectedTournaments, setSelectedTournaments] = useState({
    warmup: false,
    main: false,
    side: false,
  });

  // Calculate total price
  const calculateTotal = () => {
    const { warmup, main, side } = selectedTournaments;

    // Package deal: all tournaments for 750 NOK
    if (warmup && main && side) {
      return { total: 750, isPackageDeal: true };
    }

    // Individual pricing
    let total = 0;
    if (warmup) total += 250;
    if (main) total += 350;
    if (side) total += 250;

    return { total, isPackageDeal: false };
  };

  const priceInfo = calculateTotal();

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Tournament Selection */}
      <div>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">
          Tournament Selection
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          Select which tournaments you want to participate in.
        </p>

        <div className="space-y-4">
          {/* Warmup Tournament */}
          <label
            htmlFor="warmup-tournament"
            className="block bg-cyan-900/30 border-2 border-cyan-500/50 rounded-lg p-4 cursor-pointer hover:bg-cyan-900/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="warmup-tournament"
                name="warmupTournament"
                value="true"
                checked={selectedTournaments.warmup}
                onChange={(e) =>
                  setSelectedTournaments((prev) => ({
                    ...prev,
                    warmup: e.target.checked,
                  }))
                }
                className="mt-1 h-5 w-5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
              />
              <div className="flex-1">
                <div className="block font-semibold text-cyan-200">
                  XMAS Matchplay Open Warmup 2025 (Friday)
                  <span className="ml-2 text-cyan-300">250 NOK</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  Death Race format with Amazing Race finals - 125% TGP
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Friday evening, December 5th
                </p>
              </div>
            </div>
          </label>

          {/* Main Tournament */}
          <label
            htmlFor="main-tournament"
            className="block bg-purple-900/30 border-2 border-purple-500/50 rounded-lg p-4 cursor-pointer hover:bg-purple-900/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="main-tournament"
                name="mainTournament"
                value="true"
                checked={selectedTournaments.main}
                onChange={(e) =>
                  setSelectedTournaments((prev) => ({
                    ...prev,
                    main: e.target.checked,
                  }))
                }
                className="mt-1 h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="block font-semibold text-purple-200">
                  XMAS Matchplay Open Main 2025 (Saturday & Sunday)
                  <span className="ml-2 text-purple-300">350 NOK</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  Group matchplay qualifications (Saturday) followed by playoffs
                  (Sunday) - 200-250% TGP
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Saturday, December 6th and Sunday, December 7th
                </p>
              </div>
            </div>
          </label>

          {/* Side Tournament */}
          <label
            htmlFor="side-tournament"
            className="block bg-pink-900/30 border-2 border-pink-500/50 rounded-lg p-4 cursor-pointer hover:bg-pink-900/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="side-tournament"
                name="sideTournament"
                value="true"
                checked={selectedTournaments.side}
                onChange={(e) =>
                  setSelectedTournaments((prev) => ({
                    ...prev,
                    side: e.target.checked,
                  }))
                }
                className="mt-1 h-5 w-5 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
              />
              <div className="flex-1">
                <div className="block font-semibold text-pink-200">
                  XMAS Matchplay Open Side 2025 (Saturday evening)
                  <span className="ml-2 text-pink-300">250 NOK</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  Progressive strikes matchplay with top 8 playoffs
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Saturday evening, December 6th (after main tournament)
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* Total Price Calculator */}
        {priceInfo.total > 0 && (
          <div className="mt-6 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/50 rounded-lg p-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-1">
                  Total to pay at arrival:
                </h3>
                {priceInfo.isPackageDeal && (
                  <p className="text-sm text-green-300 font-semibold">
                    Package Deal - Save 100 NOK!
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Norwegian players: Vipps on arrival
                  <br />
                  International players: We'll figure something out
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-cyan-300">
                  {priceInfo.total} NOK
                </p>
                {priceInfo.isPackageDeal && (
                  <p className="text-sm text-gray-400 line-through mt-1">
                    850 NOK
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">
          Personal Information
        </h2>

        <div className="space-y-4">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Your first name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="+47 123 45 678"
            />
            <p className="text-xs text-gray-400 mt-1">
              Include country code for international numbers
            </p>
          </div>

          {/* IFPA Number */}
          <div>
            <label
              htmlFor="ifpaNumber"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              IFPA Number <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              id="ifpaNumber"
              name="ifpaNumber"
              className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="12345"
            />
            <p className="text-xs text-gray-400 mt-1">
              Your International Flipper Pinball Association player number, if
              you have one.
            </p>
          </div>
        </div>
      </div>

      {/* Captcha */}
      <div>
        <div className="flex justify-center">
          <Turnstile
            ref={turnstileRef}
            siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>
      </div>

      {/* Error Status (inline) */}
      {submitStatus && submitStatus.type === "error" && (
        <div className="p-4 rounded-lg bg-red-900/30 border-2 border-red-500/50 text-red-200">
          <p className="font-semibold">{submitStatus.message}</p>
        </div>
      )}

      {/* Success Modal */}
      {submitStatus && submitStatus.type === "success" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg border-4 border-green-500/80 p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold text-green-300 mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-200 mb-6">{submitStatus.message}</p>
              <div className="space-y-3">
                <a
                  href="/xmas"
                  className="block w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-200"
                >
                  Back to Tournament Information
                </a>
                <a
                  href="/xmas/players"
                  className="block w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  View Registered Players
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting ? "Submitting..." : "Register for Tournament"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          <span className="text-red-400">*</span> Required fields
        </p>
      </div>
    </form>
  );
}
