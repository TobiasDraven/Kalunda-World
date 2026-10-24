# Placeholders — images and audio

Empty on purpose. Drop files here and point the HTML at them.

## assets/img/
Suggested files (keep them small — 1200 px wide, JPEG or PNG, under ~300 KB each):

| File | Used by | What it should show |
| :-- | :-- | :-- |
| `valley-map.png` | geography page | Buyu valley, nine wards, Luvasi river, Mbuyane flood plain, Kisingo pass |
| `corridor-map.png` | geography page | Kembe–Mbuyane corridor, road network, distances |
| `national-map.png` | geography page | National territory, neighbours, the rail line to Nsundu |
| `depot.jpg` | news (both) | The relief depot at Mbuyane, or a convoy on the corridor |
| `camp.jpg` | news (regional wire) | The displaced camp at Nsimbi, from a respectful distance |
| `valley-tourism.jpg` | tourism | The valley at its best — river, escarpment, morning light |
| `escarpment.jpg` | tourism | The Tsero escarpment |
| `market.jpg` | tourism | A valley market |

Generate with the `text2img-prompting` skill. Any text in an image is a short placard or sign only — mastheads and headlines are typeset in HTML, never generated.

## assets/audio/
Suggested files (mono, 64–96 kbps MP3, under ~1 MB each):

| File | Used by | Content |
| :-- | :-- | :-- |
| `kbs-bulletin-140106.mp3` | radio page | 06:00 bulletin — the day's official line |
| `kbs-bulletin-140112.mp3` | radio page | 12:00 bulletin — the day's official line, updated |
| `kbs-interview-XXXX.mp3` | radio page | Optional interview clip — a resident, a trader, an official |

Scripts are written as 10 sentences maximum and read by the operator's chosen text-to-speech service. Keep the in-world fiction: the station sounds slightly under-resourced, not polished.

## Label rule
Everything on this site is simulated media produced for a fictional setting. Keep the `README.md` claim ("fictional") in the repo, and never present generated imagery as a real photograph.
