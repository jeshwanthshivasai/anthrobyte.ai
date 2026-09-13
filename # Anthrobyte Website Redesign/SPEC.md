# Anthrobyte Home V4 — locked spec (21 rounds, Aug 2026)

## Global
- Accent: #FF6028 (real logo orange) as live CSS var `--accent` (alts #ff6a1a / #e8620c via Tweaks)
- Real logo assets (from uploads/anthrobyte_logo.svg): assets/logo-dark.svg (white wordmark), assets/logo-light.svg (ink wordmark), assets/mark.svg — used in header (theme-flips), footer, CTA
- LIGHT site (matches brand): only loader-frame, hero + footer dark; everything Challenge→CTA on #f4f2ee
- NO sound, NO magnetic hover (removed per feedback); dot cursor + scramble kept; NO numbering anywhere (eyebrows, steps, pillars, FAQ, menu)
- Type: Geist (display + UI, huge/tight), Newsreader italic (editorial accents only), IBM Plex Mono (data)
- Palette: dark #08090b; ONE light interlude (Why Anthrobyte) at #f6f5f2
- Custom dot cursor; magnetic + text-scramble hovers; interaction-only sound w/ SND toggle
- Custom inertia scroll (vanilla, portable); pinned scenes allowed; desktop-first, simple mobile
- A11y pass (Aug 23): prefers-reduced-motion kills transitions/wobble/scramble + instant scroll; focus-visible orange outlines; [data-h] targets keyboard-operable (tab + Enter/Space, Esc closes menu); closed menu visibility:hidden so it's not tab-reachable — all 4 pages + site.js
- Header: wordmark + MENU only. Menu = full-screen split ledger: numbered links left, live particle-formation preview (main canvas morphs) + serif line right
- Footer blocks: big CTA, sitemap ×4, locations + EST 2025, email, legal/socials, particle logo sign-off
- Lusion-style page hand-off: auto-advance past footer → logo returns via reverse void-mask → draws → mask-reveals next page (Home → AAtlas Agents → AI Transformation → Journal); navbar links use same transition

## Loader
First visit only (sessionStorage; Tweak to replay). 3.0s: logo VOID outline draws itself (no counter) → void-shaped mask expands to reveal hero. Repeat visits: quick 0.6s mask.

## Hero (from picked comp Hero-E-Measured)
Centered, type-dominant, ZERO chrome. Mark (real WebGL trefoil, orange edges, dark standard material) floats above centered 2-line Geist headline "Structured Intelligence / for Complex Operations" + serif italic "Clarity before acceleration." No eyebrow, no sub-info, no progress bar. Mark dead still; imperceptible camera drift; NO cursor reaction; never clipped.
Pinned scroll-explode over 250vh: blades separate, leader labels appear — 01·SENSE, 02·DECIDE, 03·ACT (blades), 04·HUMAN JUDGMENT (center void).

## Section order = native site order (strict)
Hero → The Challenge → How We Work (3 steps) → Why Anthrobyte (5 items, LIGHT) → Agent deck (5 cards + metrics, redesigned kinetic tabs, no pinning) → FAQ ×8 (verbatim from anthrobyte.ai; fallback: drafted in site voice + marked) → CTA banner → Footer

## One morphing particle protagonist (enters fresh at section 02)
scatter dust → strata planes (Challenge) → flow network (How We Work) → terrain (Why Anthrobyte) → word AATLAS (agent deck intro) → curve tracing (FAQ) → logo re-form (CTA/footer). GPU vertex-shader morph between baked targets, curl-ish wobble, ~30k pts.

## Delivery
V7 (current, Aug 23 PM) + 3 sibling pages, menu + footer-progress navigation wired across all 4 files (Home V7 / AAtlas Agents / AI Transformation / Journal .dc.html; shared shell in site.js).
- Loader: petals draw + fill; content reveals ONLY through the center void (circle mask, no Y channels); logo scales out. Subpages: quick 0.75s void reveal.
- Hero: logo+title nudged to true center; dark mark w/ tighter petal gap; strong orange bloom behind (z2 under canvas); swap word orange serif.
- Ghost titles: near-black, 9.4vw, appear with each transition at center, fade out — NO eyebrow morph, eyebrows deleted from narrative sections.
- Why: title top, para+pillars right, 3D lower-left (no overlap).
- Agents = pinned particle act: stack un-tilts + reforms to flat 2D mark at center (u~10.5-11.1) → bursts into ink+orange particles → header/tabs/text fade in → 5 content-matched formations (radar / bars / SKU-merge / scan-lines / exploded stack) scrubbed by scroll u 11.9-15.9 (0.8u per tab; tabs click-scroll too) → fades → FAQ.
- Menu: real page navigation w/ fade hand-off, scramble hover, live 3D mark on right (canvas z-raised, per-link gap pose); Home closes menu.
- Footer: partner paragraph under logo; Lusion-style KEEP SCROLLING progress bar at page end (wheel accumulates w/ decay → auto-advance to next page). Chain: Home→Agents→Transformation→Journal→Home.
- Subpages: native scroll + IO reveals + hero WebGL poses (Agents: 5-layer exploded + AATLAS acronym letters + iso-SVG deck rows + IaaS commitments + 4 deployment steps; Transformation: 88% stat hero + gap quote + maturity ladder w/ two markers + 8 conditions + assessment duo; Journal: eyebrow verbatim + featured Asimov essay + 3 DRAFT-titled rows).
- OPEN: verbatim FAQ answers; verbatim journal essay titles (3 marked DRAFT); poll-question copy for Transformation.
- V5/V6 = superseded checkpoints.


## Section 2 — LOCKED SPEC (built from 28-round interview, Aug 2026)
- Title left-aligned: "Complexity is" (Space Grotesk 600, ink) / "Layered." (Newsreader italic, SOLID #FF6028, large but contained)
- Subtitle in peach pill rgba(255,96,40,.07) r10: "Leadership intent shapes operations below. Ground realities reshape strategy above."
- Bottom-left: 3px orange bar + italic "Clarity must precede deployment." + CTA mono "NAVIGATE COMPLEXITY WITH US →" (underline rgba(255,96,40,.55))
- Ladder: INTENT/STRATEGY/PLANNING/OPERATIONS/GROUND · IBM Plex Mono 10px uppercase .26em ink62% · diagonal steps (top rightmost) · warm hairline rgba(255,96,40,.5) → 5px orange dot at petal · no numbers · fixed positions
- Motion: masked line rise, snappy; labels scroll-staggered ONE PER BEAT (long dwell — stretch scroll window); exit = hairlines retract (scaleX→0 origin left) + labels fade
- 3D: right-aligned to right edge (breathing room for ladder), copper finish (Home V7 ONLY), explosion gap stays 1.25
- Narrow: tune too (compact ladder)

## Approved additions (order: menu → footer → cursor+audio), per-section check-ins
- Menu: split panel — links left, LIVE 3D pose thumbs right
- Footer: colossal wordmark; emails hello@/careers@anthrobyte.ai; columns verbatim: Company(Home, AAtlas Agents, Careers, Journal, Case Studies) Legal(Privacy Policy, Terms of Use, Responsible AI, Security and Trust Policy, Cookie Policy) Support(Vendor Portal, Support Desk); legal line "© 2026 Anthrobyte."; missing pages = plain dead # links; NO socials
- Cursor: custom dot + magnetic (links & buttons only) · Audio: airy whooshes, muted default
- Engineering: adaptive quality tiers; NO reduced-motion fallback for now

## FROZEN — do not change (user's story)
- NO loader/preloader. Why Anthrobyte + Agents sections stay EXACTLY as current (refine feel only, never structure/content). Section set fixed, no additions/cuts. Beats may stretch for s2 dwell but story order untouched.
- Deep pass style: blend precision base + occasional surprise; adaptive tiers; deep pass top-to-bottom; check in per section.
