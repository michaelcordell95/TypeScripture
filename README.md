# ✝ TypeScripture

**A Bible typing practice app — read, type, and memorize scripture.**

Live at [typescripture.com](https://typescripture.com)

---

## What It Is

TypeScripture is a web app that lets you type through the entire KJV Bible, tracking your speed and accuracy along the way. It started as a typing practice tool and evolved into a full Bible reading and memorization app with leaderboards, bookmarks, and a dedicated read mode.

---

## Features

### Typing Mode
- Type any verse from the full KJV Bible
- Real-time WPM and accuracy tracking
- Personal best scores saved per verse
- **Easy Mode** — strips punctuation and lowercases text for beginners
- **Repeat Mode** — loops the current verse for memorization practice
- Verse streak counter — tracks consecutive verses completed
- Left/right arrow keys to reset or advance verses

### Read Mode
- Toggle Read Mode to read without typing
- Full white text, no keyboard popup on mobile
- Big bottom navigation bar (👈 ⭐ 👉) for easy thumb tapping
- Stats bar hides automatically
- Easy Mode turns off so you see proper KJV text

### Navigation
- Browse all 66 books, 1189 chapters, 31,102 verses
- Auto-advances through verses and chapters
- URL params support: `/?book=John&chapter=3&verse=16`

### Bookmarks (⭐)
- Save any verse with one tap
- Bookmarks page shows saved verses with text
- Click a bookmark to jump straight back to that verse

### Verse Search
- Full-text keyword search across the entire KJV
- Highlighted matches with "Type It" button to jump to any result
- Paginated results for common words

### Leaderboard
- **Bible Completion** — global ranking by verses completed; full Bible finishers get 👑 and stay pinned to the top
- **Scores** — best WPM by verse, chapter, or book
- **My Stats** — personal completion %, verses, books, chapters, avg WPM, best WPM
- **Player Search** — look up any user's stats

### Progress Tracking
- Bible completion progress bar across all 31,102 verses
- Per-verse best WPM stored in Supabase
- `completed_at` timestamps for future WPM-over-time charts
- Checkmarks on completed books, chapters, and verses in dropdowns

### Authentication
- Google OAuth sign-in
- Username system for leaderboards
- Progress syncs across devices when signed in

### PWA (Progressive Web App)
- Installable on iPhone via Share → Add to Home Screen
- Android shows native install prompt
- Standalone display mode (no browser chrome)
- App icon matches site branding

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (single file) |
| Bible Data | KJV JSON loaded from `bible.js` |
| Auth & Database | [Supabase](https://supabase.com) |
| Hosting | GitHub Pages + custom domain |
| PWA | Web App Manifest + Service Worker |

---

## Database Schema (Supabase)

### `verse_progress`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid | FK → auth.users |
| book_name | text | e.g. "Romans" |
| chapter_num | int | |
| verse_num | int | |
| best_wpm | int | Only saved on 100% accuracy |
| completed | bool | Set on ≥50% accuracy |
| completed_at | timestamptz | Timestamp of completion |

### `profiles`
| Column | Type | Notes |
|---|---|---|
| id | uuid | FK → auth.users |
| username | text | Unique, 3–20 chars |

### `bookmarks`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid | FK → auth.users |
| book_name | text | |
| chapter_num | int | |
| verse_num | int | |
| created_at | timestamptz | |

---

## File Structure

```
/
├── index.html          # Main app (TypeScripture_biblejs.html → index.html)
├── leaderboard.html    # Leaderboard page
├── bookmarks.html      # Bookmarks page
├── search.html         # Verse keyword search
├── bible.js            # Full KJV Bible data (JSON)
├── manifest.json       # PWA manifest
├── sw.js               # Service worker
├── icon-192.png        # PWA icon
├── icon-512.png        # PWA icon
└── README.md
```

---

## Local Development

No build step needed — it's all static files.

```bash
# Clone the repo
git clone https://github.com/yourusername/typescripture.git
cd typescripture

# Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

> Note: Google OAuth won't work on localhost unless you add it as an allowed redirect URL in your Supabase project settings.

---

## Roadmap

- [ ] WPM progress chart over time (data collecting via `completed_at`)
- [ ] Daily streak system
- [ ] Share/challenge a verse link
- [ ] Bible completion hall of fame
- [ ] Offline support via service worker caching

---

## Contributing

Pull requests welcome. For major changes, open an issue first.

---

## License

MIT
