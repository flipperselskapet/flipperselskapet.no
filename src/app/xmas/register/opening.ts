export const REGISTRATION_OPENS_AT = new Date("2026-10-10T20:00:00+02:00");

export function isRegistrationOpen(now: Date = new Date()) {
  return now >= REGISTRATION_OPENS_AT;
}
