# Quick Start: Presentation Mode

## Installation & Setup

### 1. Files Added/Modified

- ✅ **NEW:** `src/App-Presentation.jsx` - Presentation-optimized component
- ✅ **UPDATED:** `src/index.css` - Presentation styles + CSS variables
- ✅ **NEW:** `PRESENTATION_MODE_README.md` - Detailed documentation

### 2. Switch to Presentation Mode

**Option A: Update `src/main.jsx`**

```javascript
// Before:
import App from './App'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// After:
import App from './App-Presentation'  // ← Change this line
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

**Option B: Keep Both (Create Switcher)**

```javascript
import { useState } from 'react'
import App from './App'
import AppPresentation from './App-Presentation'

function Root() {
  const params = new URLSearchParams(window.location.search)
  const mode = params.get('mode') || 'normal'
  return mode === 'presentation' ? <AppPresentation /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)

// URLs:
// http://localhost:5173/?mode=normal (default)
// http://localhost:5173/?mode=presentation (presentation)
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or use presentation mode URL from Option B above)

---

## Features at a Glance

| Feature | Details |
|---------|---------|
| **Navigation** | Arrow keys (↑↓←→) + on-screen buttons |
| **Slide Time** | Instant transitions (no animation delay) |
| **Content** | All data fits in 100vh without scrolling |
| **Spacing** | Consistent CSS variables throughout |
| **Data Density** | Maximized tables, grids, and cards |
| **Accessibility** | Large fonts, high contrast, keyboard-friendly |
| **Responsive** | Mobile/tablet/desktop/projector compatible |
| **Keyboard** | Full keyboard control (no mouse needed) |

---

## Live Presentation Checklist

Before going live:

- [ ] Test arrow key navigation (↑↓←→)
- [ ] Test all 8 sections render properly
- [ ] Check on actual projector/display
- [ ] Verify font sizes are readable from distance
- [ ] Test search functionality (Staff section)
- [ ] Confirm facility modal works
- [ ] Check contact form (if needed)
- [ ] Press F11 for full-screen mode
- [ ] Brightness/contrast set appropriately

---

## Keyboard Shortcuts Reference

| Key(s) | Action |
|--------|--------|
| `↓` or `→` | Next slide |
| `↑` or `←` | Previous slide |
| Click dot | Jump to section |
| `Esc` | Close modal (if applicable) |
| `F11` | Full-screen toggle |

---

## Troubleshooting

**Q: Slides seem to have extra scrolling**  
A: Make sure browser zoom is at 100%. Adjust if needed with Ctrl/Cmd +/-

**Q: Keyboard not working**  
A: Click on the presentation area first to give it focus, then use arrow keys

**Q: Text blurry on projector**  
A: Enable hardware acceleration in browser settings, or use full-screen mode (F11)

**Q: Want to go back to original app?**  
A: Either revert `src/main.jsx` to import `App.jsx`, or use URL parameter: `?mode=normal`

---

## Sections Overview (8 Total)

1. **Overview** - Stats, highlights, welcome
2. **About** - Vision, mission, management committee
3. **Facilities** - School infrastructure & amenities
4. **Programs** - Subject pathways for Forms 1-4
5. **Sports** - Trophies, records, athletics
6. **Staff** - Full directory with search
7. **Org Chart** - Administrative structure
8. **Contact** - Key contacts, location, hours

**Navigation:** Press ↓ to go through slides sequentially, or click the dots at the bottom to jump.

---

## Deployment Notes

When deploying to production:

1. Choose **Option A or B** from "Switch to Presentation Mode" above
2. Update `.env` or build config if needed
3. Test on target display/projector before live event
4. Recommend using up-to-date browser (Chrome, Firefox, Edge, Safari)
5. Disable browser extensions that might interfere
6. Full-screen mode recommended for presentations

---

## File Sizes & Performance

- App-Presentation.jsx: ~45 KB (same as original App.jsx)
- index.css additions: ~2 KB
- No new npm dependencies
- Load time: Instant (no lazy loading)
- Browser support: All modern browsers

---

## Tips for Great Presentations

✨ **Before Your Event:**
- Practice navigating with arrow keys
- Set up projector in advance
- Adjust screen brightness/contrast
- Have backup files on USB
- Test internet for quote fetch feature

✨ **During Presentation:**
- Speak toward audience, not screen
- Use pointer/laser for emphasis
- Let each slide breathe (5-10 seconds per slide)
- Use pause button if needed (click navigation to hold)
- Don't rush—give parents/audience time to absorb info

✨ **After Presentation:**
- Collect feedback
- Save any photos/videos
- Archive presentation files with date stamp

---

**Questions?** Refer to `PRESENTATION_MODE_README.md` for complete documentation.

**Last Updated:** March 31, 2026
