# KALUNDA — in-world web portal (GitHub Pages)

A static, plain-HTML site presenting the Republic of Kalunda to exercise players: country, government notices, two newspapers, geography/maps, a radio station and a tourism board. Everything here is **fictional**; the site is presented in-world and carries no reference to the course, the SANDF or the exercise.

## Why it looks like this
The fiction: Kalunda connected to the international network recently, so its national portal is rudimentary — serif type, tables, a visitor counter that is obviously fake, sections "under construction". The low-tech look is a world fact, not a compromise. Do not modernise it.

## Deploy (house pattern — see `COMMON/AGENTS/WORKFLOWS/HOSTING/GH-PAGES.md`)
- Public repo, deploy by **GitHub Actions** (`.github/workflows/pages.yml`), as with the Strategos Telos site.
- Repo Settings → Pages → Source: **GitHub Actions**.
- No secrets in the repo, ever. Everything is static and fictional.
- Alternative (no Actions): Settings → Pages → Deploy from a branch → `main` / `root`. The `.nojekyll` file is present for that path.

### First publish (operator runs these)
```bash
cd "C:/OBSIDIAN-VAULT/ASTRALIS/ATELIER/EXDESIGN-CPX-INFSCHOOL-2026/70-SITE"
git init -b main
git add .
git commit -m "Kalunda portal — initial scaffold"
gh repo create kalunda-portal --public --source=. --remote=origin --push
# then: Settings > Pages > Source: GitHub Actions
```
Site lands at `https://<your-github-user>.github.io/kalunda-portal/`.

## Fill map — what Atlas writes into which page
| Page | Fills from | Notes |
| :-- | :-- | :-- |
| `index.html` | `10-WORLD/FICTIONAL-STATE.md` §At a glance | Home: three short paragraphs + a welcome from the Ministry of Information |
| `country.html` | `FICTIONAL-STATE.md` §Geography/§Climate/§People/§Economy | At-a-glance table is already seeded from `COINED-VOCAB.md`; extend, do not contradict |
| `government-notice.html` | `10-WORLD/MANDATE-DOSSIER.md` §The decision path | **Public notice only** — the government's request for assistance and the Compact's endorsement. NEVER reproduce the operational mandate, ROE or caveats here: those are player material |
| `news/index.html` | `10-WORLD/MEDIA-SEEDS.md` | Newsstand page linking the two outlets |
| `news/kalunda-daily.html` | `MEDIA-SEEDS.md` + editorial line: government-aligned | Lead story + two short items + photo slot. Deliberately imperfect reporting |
| `news/regional-wire.html` | `MEDIA-SEEDS.md` + editorial line: regional/international | Same events, different framing. Skeptical of the government |
| `geography/index.html` | `10-WORLD/GEOGRAPHY-AND-AO.md` | Map slots (PNG/SVG in `assets/img/`), scale note, downloadable PDF slot |
| `radio/index.html` | operator's mp3s in `assets/audio/` | Programme schedule table + HTML5 players + transcript links |
| `tourism/index.html` | `FICTIONAL-STATE.md` §Geography + operator's photos | Cheerful and oblivious — the board advertises the Buyu valley while the valley is in crisis |

## House rules for this site
- **Fictional only.** No real state, organisation, person, unit or doctrine text.
- **No exercise metadata.** No course name, no SANDF, no inject references, no "CPX" anywhere on the pages.
- **Public site carries public information.** Operational orders, ROE and caveats stay in the player packs, not on a portal the in-world public can read.
- **Keep it dated.** Every page footer carries a date consistent with the scenario clock (authorisation 13 January, scenario opens 14 January).
- **Text in images is composited**, not generated — see the `text2img-prompting` skill.

## Advertising — `assets/js/ads.js`
A portal with no advertising reads as staged, so the front page carries banner ads: 210 × 176 creatives for in-world businesses and ministries, with "Advertisement" labels and an "Advertise on this portal" line, exactly as a 2003 ministry portal would.

- **Include it:** `<script src="assets/js/ads.js"></script>` (or `../assets/js/ads.js` from a subfolder). Paths resolve from the script's own location, so one tag works at any depth.
- **Placement:** by default the ad block is inserted directly below the nav. For explicit placement, put `<div id="kalunda-ads" data-num-rows="2"></div>` where you want it.
- **Selection:** stable per page (seeded from the path) so two students looking at the same page see the same portal. `data-rotate="true"` reshuffles on each load instead.
- **Missing plates degrade gracefully** to a bordered box carrying the caption — never a broken-image icon, and it still reads as an ad.
- **The rogue slot:** `ads.js` carries a commented example for a "Statement from the Tsero National Movement (mirror, hosted abroad)" creative. The rotation is the right hiding place for rebel material — interior pages only, never the front page, never the nav, caption phrased as a period ad would phrase it.

Creative briefs and filenames: `assets/img/ads/README.md`. Do not use a real brand, a real website or a third-party script — every click-through must stay inside the fiction.

## Placeholders
`assets/img/` and `assets/audio/` are empty on purpose. Add files there and point the pages at them; the HTML already has the slots marked.
