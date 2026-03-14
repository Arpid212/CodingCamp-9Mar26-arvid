---
inclusion: always
---

# To-Do List Dashboard — Project Steering

## Project Overview
A standalone productivity dashboard web app with greeting, focus timer, to-do list, and quick links. No backend, no frameworks.

## File Structure
```
index.html                  # HTML entry point
css/To-do_list_dashboard.css  # Single CSS file
js/To-do_list_dashboard.js    # Single JavaScript file
```

## Tech Stack
- HTML, CSS, Vanilla JavaScript only
- Browser Local Storage for all persistence
- No frameworks, no build tools, no backend

## Key Conventions
- All data saved to Local Storage immediately on change
- Local Storage keys: `tasks`, `quickLinks`, `theme`, `userName`
- Time-based greeting: Morning (5-11:59), Afternoon (12-16:59), Evening (17-20:59), Night (21-4:59)
- Focus timer default: 25 minutes, displayed as MM:SS

## Optional Features Implemented (3 of 5)
1. Light/Dark mode toggle (saved to Local Storage)
2. Custom name in greeting (saved to Local Storage)
3. Prevent duplicate tasks (case-insensitive check)
