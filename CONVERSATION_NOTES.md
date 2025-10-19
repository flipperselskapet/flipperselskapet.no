# Conversation Notes - Flipperselskapet.no Project

## Project Overview
Next.js 15.5 website for Kristiania Flipperselskap (Oslo pinball club)
- **Tech Stack**: Next.js 15.5, React 19, Tailwind CSS v4, TypeScript, Biome
- **Package Manager**: pnpm (10.18.3+)
- **Development**: `pnpm dev` runs on localhost:3000

## Project Structure
- `/src/app/` - Next.js App Router pages
  - `page.tsx` - Homepage with neon sign logo
  - `layout.tsx` - Root layout with Geist fonts, Analytics, SpeedInsights
  - `globals.css` - Global styles including neon sign CSS animations
  - `/machines/page.tsx` - Pinball machine inventory (47 machines)
  - `/xmas/page.tsx` - XMAS Matchplay Open 2025 tournament page
  - `/birthdaybash2019/page.tsx` - Migrated old event page
  - `/xmas2020/page.tsx` - Migrated old event page
  - `/slack/page.tsx` - Redirect to Slack invite
- `/public/` - Static assets (wall.jpg background image)
- `/old/` - Original HTML site files (migrated)

## Key Design Elements

### Neon Sign Effect
Used on homepage and XMAS page header:
```css
.neon-logo {
  font-family: "Vibur", cursive;
  font-size: 9vh;
  color: #fee;
  text-shadow: 0 -40px 100px, 0 0 2px, 0 0 1em #ff4444, 0 0 0.5em #ff4444, 0 0 0.1em #ff4444, 0 10px 3px #000;
}
/* Includes blinking animation on certain letters */
```

### Color Scheme
- **NOT Christmas colors** - Uses cyan/blue/purple/pink gradients
- Dark background: slate-950/slate-900 gradients
- Accent colors: cyan-400, blue-500, purple-500, pink-500

## Pages Completed

### Homepage (`/`)
- Neon sign logo: "Kristiania Flipperselskap"
- Background: wall.jpg
- Discrete link to /machines in bottom-right corner

### Machines Page (`/machines`)
- **47 pinball machines** listed in responsive table format
- Columns: Machine Name, Manufacturer, Year, Rating, IPDB Link
- Responsive: Hides columns on smaller screens
- IPDB links for 19 machines, 28 have placeholder TBD info

#### Machines with Complete Info:
1. AC/DC (Stern, 2012) - Rating TBD
2. The Avengers Pro (Stern, 2012) - 6.753/10
3. Doodle Bug (Williams, 1971) - 7.5/10
4. Frontier (Bally, 1980) - 7.592/10
5. GoldenEye (Sega, 1996) - 7.8/10
6. Harlem Globetrotters On Tour (Bally, 1979) - 7.50/10
7. Heavy Metal Meltdown (Bally Midway, 1987) - 7.5/10
8. Hot Tip (Williams, 1977) - Rating TBD
9. KISS Pro (Stern, 2015) - 7.8/10
10. Quicksilver (Stern, 1980) - 7.827/10
11. Rick and Morty (Spooky Pinball, 2020) - Rating TBD
12. Sea Ray (Bally, 1967) - 7.2/10
13. Sky Jump (Gottlieb, 1974) - 7.887/10
14. Starship Troopers (Sega, 1997) - 7.79/10
15. Stranger Things Pro (Stern, 2019) - 8.30/10
16. Street Fighter II (Gottlieb, 1993) - 7.16/10
17. Viking (Bally, 1980) - Rating TBD
18. Wrestlemania (Stern, 2015) - Rating TBD
19. The X-Files (Sega, 1997) - 7.9/10

#### Machines Needing Info (TBD):
Alien Poker, Aztec, Barracora, Batman 66, Demolition Man, Eight Ball, F-14 Tomcat, Firepower, Hardbody, High Speed 2: The Getaway, Jurassic Park, Metallica, Old Chicago, Pharaoh, Road Show, Roller Games, Royal Flush, Shadow, Space Station, Space Time, Star Trek: The Next Generation, Stars, Surf Champ, Tron, Turtles, Whirlwind, World Cup Soccer

### XMAS Matchplay Open 2025 (`/xmas`)
Tournament page in **English** with complete information.

#### Event Details
- **Dates**: December 5-6, 2025
- **Location**: Kristiania Flipperselskap, Veitvetveien 8, 0596 Oslo
- **Venue**: Veitvet Senter (shopping center)
- **Transport**: Metro T-bane line 5 to Veitvet station (15 min from downtown)

#### Tournament Structure (3 tournaments)

**1. XMAS Warmup** (Friday, Dec 5)
- Format: Death Race + Amazing Race finals
- IFPA Points: 125% TGP
- Schedule:
  - 17:00-18:00: Registration
  - 18:00-22:00: Death Race (group matchplay until 10 players reach 21 points)
  - 22:00-00:30: Amazing Race Finals (top 10 compete)

**2. XMAS Main** (Saturday, Dec 6)
- Format: 6 rounds group matchplay
- IFPA Points: 200% TGP
- Schedule:
  - 09:30-10:00: Attendance
  - 10:00-18:00: Main tournament

**3. XMAS Side** (Saturday evening, Dec 6)
- Format: Progressive strikes
- Schedule: 18:00-00:00

#### Page Sections
1. **Hero Section**: Neon sign header, event intro, club description, limited spots warning
2. **Registration**: Opens soon, payment info (Vipps for Norwegians), player list TBD
3. **Tournament Format**: All 3 tournaments with preliminary warning banner
4. **Practical Information**:
   - Location details with Google Maps link
   - Metro transport info (T-bane line 5)
   - Accommodation: Thon Hotel Linne recommendation
   - Machines: Link to /machines page
   - Food & Drinks: 2-column grid of restaurants and shops (Burger King, Istanbul, Spar, Coop Extra, Vinmonopolet)
5. **Schedule**: Friday and Saturday with preliminary warning banner

#### Important Notes
- ⚠️ Preliminary warnings on both format and schedule sections
- Limited spots due to space constraints
- Entry fees not yet decided (removed from page)
- Pre-tournament tip: Visit Illegal Pinball Club downtown

## Design Decisions Made
1. **No Christmas colors** - Despite "XMAS" name, uses cyan/blue/purple color scheme
2. **No pulsing/blinking header** - Changed to static neon sign style matching homepage
3. **No opening hours** - Kept website links for restaurants/shops, removed messy hours
4. **Table layout** - Changed from cards to compact table for 47 machines
5. **English language** - XMAS page in English (rest of site mostly Norwegian)
6. **Geist fonts preserved** - Keep for general pages, neon sign uses Vibur font

## Known Issues / TODOs
- 28 machines still need manufacturer, year, rating, IPDB ID info
- Entry fees for XMAS tournament TBD
- Registration link not yet available
- Tournament format marked as preliminary
- Schedule marked as preliminary

## Reference URLs
- IPDB (machine database): https://www.ipdb.org/machine.cgi?id={id}
- Veitvet Senter Google Maps: https://maps.app.goo.gl/GEfjhTpv9SAzE8JR6
- Last year's event info: ifpa.no/xmas2024/ (referenced for content)

## Git Status (at start)
- Current branch: master
- Modified: .gitignore
- Renamed: Multiple files moved to old/ folder
- New: Next.js app structure in src/, public/, config files

## Commands Used
- `pnpm dev` - Development server (running on 3f69bd)
- `pnpm build` - Production build
- `pnpm start` - Production server
- `pnpm lint` - Biome linting

## Recent Changes (Latest Session)
- Removed pulsing/blinking animation from XMAS page header
- Applied neon-logo style to match homepage aesthetic
- Header now reads: "XMAS MATCHPLAY OPEN 2025" in neon sign style
