# Ad creatives — 210 × 176 px

The portal carries banner advertising, because a national portal without it looks staged. Creatives are **in-world businesses and ministries only** — never a real brand, never a real website.

## Format
- **210 × 176 px**, PNG (or JPEG), under ~40 KB. Square-ish, slightly too tall for its width — that is correct for the era.
- Legible at that size. Six to eight words maximum of text, or none at all.
- Photograph, flat illustration or badly-rendered gradient — all period-correct. A crisp modern brand ad is not.
- Text inside the image: short placards and signs only. Captions are typeset in HTML by `ads.js`, so the caption text below is always readable even if the plate fails.

## The set (`assets/js/ads.js` references these filenames)
Present: `kalunda-mobile`, `kalunda-rail`, `ministry-health`, `mbuyane-traders`. Deliberately absent: `luvasi-bottling` and `kalunda-fa` — both exist as rendered plates but are landscape banners that lose their lettering when cropped to 210 × 176, so the slot degrades to its caption box until square artwork arrives. `ministry-information`, `tourism-board` and `tsero-mirror` have never been rendered. See `90-ADMIN/MEDIA-REGISTER-2026-10-25.md` for what shipped, what was held and why.

| File | Caption (as it appears) | Plate should show | Links to |
| :-- | :-- | :-- | :-- |
| `luvasi-bottling.png` | Luvasi Bottling — the water of the valley | A bottle or a water tanker, valley backdrop | tourism |
| `kalunda-mobile.png` | Kalunda Mobile — now in nine wards | A handset, a mast, or a coverage-map graphic with an obviously optimistic shaded area | geography |
| `ministry-health.png` | Ministry of Health — boil water before drinking | A poster-style plate, serious and slightly crude | government notice |
| `ministry-information.png` | Report rumours to your ward office | A notice-board or a radio mast, institutional colours | government notice |
| `kalunda-fa.png` | Kalunda Football Association — league fixtures | A ball, a stadium hoarding, a team photograph | news |
| `mbuyane-traders.png` | Mbuyane Traders' Association — open daily | Market stalls, produce, cloth | tourism |
| `tourism-board.png` | Visit the valley — the Tourism Board | The valley at its best; cheerful and oblivious | tourism |
| `kalunda-rail.png` | Kalunda Rail — Nsundu to Kembe | A locomotive, track, freight wagons | geography |

## Rogue slot
Once an archived movement page exists, `ads.js` has a commented example for a `tsero-mirror.png` creative reading *"Statement from the Tsero National Movement (mirror, hosted abroad)"*. The rotation is the right hiding place for it: a banner nobody inspects, on interior pages only, never in the nav.

## Behaviour
- Rows default to 2; three creatives per row at the portal's 760 px width.
- Selection is **stable per page** (seeded from the path), so a student comparing screens with a neighbour sees the same portal. Add `data-rotate="true"` to the container if you want it to reshuffle on each load instead.
- A missing plate degrades to a bordered box carrying the caption — never a broken-image icon, and the ad still reads as an ad.

## Masters and legibility
- Keep the full-resolution master in `_SOURCE/`. The folder is excluded from the public repository by `70-SITE/.gitignore` (owner Archon Atlas, decided 2026-10-26), so masters are copied to the mirror but never committed or published. `ministry-health-master-1536.png` is the first one.
- At 210 × 176 only the **headline** survives as readable text; anything smaller becomes texture. That is period-correct — a small ad in 2003 carried one legible line — so write each creative for its headline and let the caption below the plate carry the rest.
- Verified by offline OCR: the `ministry-health.png` plate reads "BOIL WATER" at full size, and the source master reads the full instructional panel correctly.

