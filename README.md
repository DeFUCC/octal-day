# `octal-day`

A self-contained, observer-based time system grounded in the octal number system, Solar system cycle observation, and personal-level recording. 

This package provides a parallel framework for tracking time through direct astronomical observation rather than inherited numerical conventions. It is designed to coexist peacefully with any existing civil time standard, serving as a complementary lens for those who wish to align their personal rhythms with the observable sky.

---

## 🌌 The Scaling Hierarchy

The system expresses time through a recursive, base-8 (octal) subdivision, creating a compact and memorable temporal address. 

| Level | Duration | Octal Representation | Description |
| :--- | :--- | :--- | :--- |
| **Era** | 243 years | `0o...` | The full Venus transit cycle. |
| **Octaeteris** | 8 years | `0o...` | The 8-solstice counting frame. |
| **Season** | 73 days | `0o111` | 1/40th of an Octaeteris. |
| **Octave** | 8 days | `0o10` | The continuous, unbroken weekly rhythm. |
| **Day** | 1 day | `0o1` | One local solar day. |
| **Octant** | 3 hours | `0o0.1` | 1/8th of a local solar day. |
| **Session** | 22.5 min | `0o0.01` | 1/8th of an octant. |
| **Topic** | ~2.8 min | `0o0.001` | 1/8th of a session. |
| **Turn** | ~21 sec | `0o0.0001` | 1/8th of a topic. |
| **Phrase** | ~2.6 sec | `0o0.00001` | 1/8th of a turn. |
| **Beat** | ~0.3 sec | `0o0.000001` | 1/8th of a phrase. |

A complete temporal address looks like: `Era-Octaeteris-Season-Day.OctantSessionTopic...` (e.g., `1-2-36-4147.5231`).

---

## 📍 The Epoch & Resonance Drift

### The Epoch
The calendar is anchored to the **local solar midnight immediately preceding the Summer Solstice of 1769**. This date follows the first historically recorded pair of Venus transits (1761–1769), marking the dawn of global, collaborative astronomical observation. 

### Resonance Drift
The system embraces the natural mechanics of the cosmos. Only the Solar backbone is strictly corrected; the rest are observed as beautiful, drifting harmonies:
- **Solar Orbit (The Backbone):** The system observes the actual Summer Solstice and resets the boundary at the preceding local midnight. This prevents any seasonal drift.
- **Venus Cycle:** 5 synodic cycles equal ~2919.6 days. This drifts by ~0.4 days relative to the 2920-day mathematical anchor per Octaeteris, accumulating to a full nodal shift over the 243-year Era.
- **Lunar Cycle:** 99 synodic months equal ~2923.5 days. This drifts ~1.6 days longer than the 8-year solar frame. Consequently, the lunar phase beautifully *flips* with each 73-day season, shifting by just 1–2 days over two seasons.

---

## ⚙️ API Reference

```javascript
import { 
  getOctaeterisState, 
  dateToOctaDate, 
  octaDateToDate,
  astronomy
} from 'octal-day';

  // Full re-export of astronomy-engine for advanced JD calculations
const {AstroTime, Seasons, Body, HourAngle, Observer } = astronomy

// 1. Get the full hierarchical state for a specific moment and longitude
const state = getOctaeterisState(new Date(), -75); // Longitude for EST
console.log(state.era);          // e.g., 1
console.log(state.octaeteris);   // e.g., 5
console.log(state.day);          // e.g., 2237
console.log(state.fraction);     // e.g., 0.5252 (local solar fraction)
console.log(state.isWaiting);    // true if in the epagomenal days post-2920

// 2. Convert a standard Date to the octal structure
const octaDate = dateToOctaDate(new Date(), -75);

// 3. Convert an octal structure back to a standard JavaScript Date
const originalDate = octaDateToDate(octaDate, -75);
```

*Note: All core exports from `astronomy-engine` are re-exported, allowing you to perform complex Julian Day (JD) calculations, find exact planetary conjunctions, and build advanced ephemerides directly alongside the octal logic.*

---

## 🛠️ Use Cases

- **Personal Timekeeping:** Tracking ecological changes, gardening, and personal rhythms aligned with the true solar day and lunar phases.
- **Astronomical Logging:** A native, base-8 framework for recording observations, transit events, and orbital mechanics.
- **Hardware Projects:** Powering offline-first, e-ink desk clocks or Raspberry Pi displays that show local solar time without relying on network time protocols.
- **Symbolic Exploration:** Mapping octal digits to combinatorial systems (like I Ching trigrams/hexagrams) to create mnemonic, multi-modal temporal addresses.

---

## 📜 License & Philosophy

**Copyright © 2026 davay42. All rights reserved.**

This software is a copyrighted authored material, published as a free-will practice of the author. You are warmly invited to observe, study, copy, and use this code for your **personal and non-commercial projects** without any fear of retaliation or legal friction. 

This package is offered as a gift to the community of observers, makers, and dreamers. For institutional or commercial redistribution, please reach out to the author to discuss terms. 

*Look up. The territory is still there.*