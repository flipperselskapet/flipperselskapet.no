// Entry fees in NOK. Shared by the registration form and the admin dashboard.
export const TOURNAMENT_PRICES = {
  warmupTournament: 250,
  mainTournament: 350,
  sideTournament: 250,
} as const;

// Ticking every tournament gives the package deal price.
export const PACKAGE_PRICE = 750;

export function registrationPrice(
  selection: {
    [K in keyof typeof TOURNAMENT_PRICES]: boolean;
  },
) {
  const keys = Object.keys(TOURNAMENT_PRICES) as (keyof typeof selection)[];
  if (keys.every((key) => selection[key])) return PACKAGE_PRICE;
  return keys.reduce(
    (sum, key) => sum + (selection[key] ? TOURNAMENT_PRICES[key] : 0),
    0,
  );
}
