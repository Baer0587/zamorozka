# CLAUDE.md — ЗаморозЪка Website Rules

## Always Do First
- Before writing any frontend code, READ these 
two files first, every session, no exceptions:
  1. `.claude/skills/frontend-design/SKILL.md`
  2. `.claude/skills/ui-ux-pro-max/SKILL.md`

## Project Context
- **Brand:** ЗаморозЪка (Ъ — always uppercase, always)
- **Product:** Handmade dumplings & pancakes delivery service, Saint Petersburg, Russia
- **Vibe:** Warm, cozy, homemade — like grandma's kitchen. NOT corporate, NOT fast food.
- **Primary language:** Russian (all copy on site must be in Russian)
- **Audience:** Families, young professionals, anyone who misses home-cooked food

## Brand Assets
- Always check the `assets/` folder before designing.
- Logo, color guide, or photos — if present, use them. Never use placeholders where real assets exist.
- Brand colors: warm cream/wheat base, terracotta-orange accent, warm beige tones.
- NEVER use cold blues, sterile whites, or corporate grays.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly.
- If no reference: design from scratch with high craft following brand vibe above.
- Screenshot output, compare against reference, fix mismatches. Do at least 2 comparison rounds.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Always use Puppeteer to make screenshots.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots saved to `./temporary_screenshots/screenshot-N.png` (auto-incremented).
- After screenshotting, read the PNG — Claude analyzes the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px"
- Check: spacing, font size/weight, colors (exact hex), alignment, border-radius, shadows

## Output Defaults
- Single `index.html` file, all styles inline, unless specified otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive (375px → 768px → 1024px → 1440px)
- All text content in **Russian language**

## Anti-Generic Guardrails
- **Colors:** NEVER use default Tailwind palette. Use warm terracotta, wheat, cream tones derived from brand.
- **Shadows:** Never use flat `shadow-md`. Use layered, warm-tinted shadows.
- **Typography:** Heading font must feel warm and characterful (NOT Inter, NOT Roboto, NOT Arial). Pair with clean readable body font.
- **Gradients:** Warm, food-inspired gradients. Think fresh bread, steam, warm lighting.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Soft, warm easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Food photography treatment — warm tones, slight vignette, appetizing look.
- **Spacing:** Generous, breathing layouts. Not cramped. Like a cozy kitchen, not a supermarket shelf.
- **Icons:** SVG only (Heroicons or Lucide). NEVER emojis as UI icons.

## Food & Brand Specific Rules
- Hero section MUST convey warmth and appetite — large food imagery, steam, hands making dumplings
- CTA buttons: primary = «Заказать сейчас», secondary = «Смотреть меню»
- Product cards: photo + name + filling description + price per 500g/1kg + «В корзину» button
- Delivery zone: Saint Petersburg + 30km radius — always mention this
- Both formats always visible: горячее (hot delivery) and замороженное (frozen)
- Brand tagline options: «Слеплено с душой», «Как у мамы», «Домашнее — значит настоящее»

## Hard Rules
- Do NOT add sections not in the TZ (tz.txt)
- Do NOT use English text on the site — Russian only
- Do NOT make it look like a fast food or supermarket brand
- Do NOT use `transition-all`
- Do NOT use default Tailwind blue/indigo/gray as primary colors
- Do NOT stop after one screenshot pass — minimum 2 rounds
- Brand name is always «ЗаморозЪка» — never «Заморозка» without the Ъ
