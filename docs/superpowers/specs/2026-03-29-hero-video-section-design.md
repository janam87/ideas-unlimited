# Hero Video Section Design

## Summary

Replace the current placeholder-image hero with a full-bleed YouTube video background. Text content (headline, description, CTAs, sidebar) remains layered on top with dark gradient overlays for readability.

## Video Behavior

- **Source:** YouTube iframe embed (placeholder video for now, swappable via a single constant)
- **Playback:** Autoplay, muted, loop, inline — no visible controls
- **Sizing:** Absolute-positioned, covers full hero area (`object-fit: cover` equivalent for iframe)
- **Fallback:** If video fails to load or on slow connections, the dark `#0a0a0a` background remains — no broken UI

## Overlay

Multi-layer CSS gradient over the video:
- **Top:** Strong fade from `#0a0a0a` (~80% opacity) — protects navbar readability
- **Bottom:** Strong fade from `#0a0a0a` (~90% opacity) — protects headline/CTA area
- **Middle:** Lighter (~40-50% opacity) — lets video breathe visually
- **Overall:** Ensures WCAG AA contrast for all text at all times

## Text Layer

No changes to existing content or layout:
- Gold label: "Est. 1990 — Mumbai, India"
- Headline: "35 Years of Fearless Theatre"
- Description paragraph
- CTAs: "Explore Productions" (primary) + "Meet the Founder" (ghost)
- Sidebar: Founded by, Languages, Home Stage

Existing Framer Motion animations remain unchanged.

## Responsive

- **All breakpoints:** Video covers full hero, overlay adjusts
- **Mobile (375px+):** Slightly stronger overlay for readability on small screens
- **Desktop (1024px+):** Full cinematic effect, editorial grid layout preserved

## Performance

- YouTube iframe with minimal params: `autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
- `playlist` param set to same video ID (required for YouTube loop)
- Iframe hidden from accessibility tree (`aria-hidden="true"`, `tabindex="-1"`)
- No additional JS libraries needed

## Implementation Scope

- **Modify:** `components/home/Hero.tsx` — add video iframe layer + gradient overlay
- **Add:** YouTube video ID constant to `lib/constants.ts`
- **No new files needed** — this is a modification of the existing Hero component

## Swappability

The YouTube video ID is stored as a single constant. To change the video later:
1. Update `HERO_VIDEO_ID` in `lib/constants.ts`
2. No other changes needed
