# `octal-day`

**A continuous, space-connected, zero-astronomy-at-runtime time system built on the observable 243-year Venus Transit cycle.**

`octal-day` is not a replacement for civil time. It is a parallel, astronomically grounded coordinate system for the inner solar system. It compresses deep time into a continuous, unbroken base-8 (octal) ruler, allowing you to observe the natural drifts and resonances of the Sun, Venus, and the Moon without fighting the physics of the sky.

## 🌌 The Ground Truth

This system requires **zero astronomical calculations at runtime**. It is built on a fixed, immutable dataset of physical observations. 

Here is the ground truth date set that anchors the system:

| Event | Date (UTC) | Timestamp | Significance |
| :--- | :--- | :--- | :--- |
| **Summer Venus Transit** | `1761-06-06T05:19:00Z` | `-6581846460000` | First predicted transit; dawn of global science. |
| **Paired Venus Transit** | `1769-06-03T22:25:00Z` | `-6329583300000`  | First observed pair; anchor of the First Era. |
| **UNIX Epoch** | `1970-01-01T00:00:00Z` | `0` | The machine standard we translate from. |
| **UNIX Day** | `1970-01-02T00:00:00Z` | `86400000` | The exact value of the mean solar day |
| **Summer Venus Transit** | `2004-06-08T08:20:00Z` | `1086682800000` | The seed of the modern digital age. |
| **Paired Venus Transit** | `2012-06-06T01:29:00Z` | `1338946140000` | **The Epoch of the Second Era.** |
| **Now** | `2026-08-05T13:13:22.572Z` | `1785935602572` | The seed of the modern digital age. |
| **Winter Venus Transit** | `2117-12-11T02:48:00Z` | `4668634080000` | The validation pair begins |
| **Paired Venus Transit** | `2125-12-08T16:01:00Z` | `4920883260000` | Validation celebration |
| **Summer Venus Transit** | `2247-06-11T11:33:00Z` | `8755212780000` | The mark of the cycle celebration |
| **Paired Venus Transit** | `2255-06-09T04:38:00Z` | `9007475880000` | The Epoch of the Third Era. |

### 2012 is the Epoch

We now have the core constant - the Transit Offset `1338946140000 ms / 86400000 ms/day` = `15497.061805555555`  days from the computer time started till it counted the exact `(1338946140000-1086682800000)/86400000` = `2919.7145833333334` days of the Summer Octaeteris 2004-2012. And now we know for sure that in `(9007475880000-1338946140000 ms)/86400000 ms/day` = `88756.13125` days we would see another closing Venus transit of the Summer Pair of year 2255 to reset the counter. But till then we can simply count days - it's `(1785935602572-1338946140000)/86400000` = `5173.489150138889` - this is the exact day of the Second Era. Look at it as Octal fractional number and you have all you need: `0o12065.37234361422564`.

While 2004 was the seed, **2012 is the digital validation point**. The 2004–2012 interval physically proved the 2,920-day resonance of the Octaeteris. Because 2012 was recorded with atomic clock precision, it provides the exact, unambiguous starting line for the Second Era. From 2012, we have an unobstructed observation of the sky, with two grand celebration Octaeterides in the 21st and 22nd centuries ahead of us.

---

## ⚡ The Essence (Zero-Runtime Astronomy)

You do not need to load heavy ephemeris libraries to know what day it is. The entire continuous time system collapses into a single fixed offset and five lines of pure arithmetic.

```javascript
// The exact fractional days from UNIX Epoch to the 2012 Venus Transit Peak
const EPOCH_OFFSET = 15497.061805555556; 
const ERA_DAYS = 88756; // The 243-year odometer (0o255264 in base-8)

function getOctalDay(date = new Date(), longitude = 0) {
  // 1. Days since UNIX Epoch (1970)
  const unixDays = date.getTime() / 86400000;
  
  // 2. Shift to the 2012 Transit Epoch, adjust for local longitude
  const localDays = (unixDays - EPOCH_OFFSET) + (longitude / 360);
  
  // 3. The continuous integer day within the 243-year Era
  const dayInEra = Math.floor(((localDays % ERA_DAYS) + ERA_DAYS) % ERA_DAYS);
  
  // 4. The fractional time of day (0.0 to 0.999...)
  const fraction = localDays - Math.floor(localDays);
  
  return {
    day: dayInEra,
    fraction,
    octal: dayInEra.toString(8).padStart(6, '0'), // The 6-digit octal odometer
    era: Math.floor(localDays / ERA_DAYS)
  };
}
```

### The Lenses (Modulo Math)
Because the grid is continuous, the physical cycles (weeks, seasons, years) are simply "lenses" applied to the raw day count:

```javascript
function getLenses(dayInEra) {
  return {
    // The unbroken 8-day week (The Octave)
    weekday: dayInEra % 8,
    
    // The 73-day mathematical season (The Pentad)
    season: Math.floor(dayInEra / 73),
    dayInSeason: dayInEra % 73,
    
    // The 2920-day Venus/Solar resonance block (The Octaeteris)
    octaeteris: Math.floor(dayInEra / 2920),
    dayInOctaeteris: dayInEra % 2920
  };
}
```

---

## 📖 Design History & Rabbit Holes

*For the attentive reader: The journey to this ultra-simple architecture required navigating the deepest problems in calendar design. If you want to understand why the system is built this way, explore the rabbit holes below.*

### 🕳️ Rabbit Hole 1: The 8-Year Reset vs. The Continuous Ruler
Initially, we designed the calendar to reset to `0` every 8 years (2,920 days) at the Summer Solstice. 
* **The Problem:** The physical solar year is 365.2422 days. 8 physical years = 2,921.9 days. Forcing a reset at 2,920 days created a "Waiting for the Sun" ambiguity, and the Solstice itself is a physical "standstill," making the exact microsecond of the reset ambiguous to observe.
* **The Solution:** We abandoned the box and built a **ruler**. By letting the counter run continuously to `88,756` days, the Solstice is no longer a boundary that forces the calendar to bend; it is simply a coordinate on the grid. The calendar absorbs the solar year perfectly.

### 🕳️ Rabbit Hole 2: The 60-Day Drift
Because we use a continuous ruler, the physical Solstices slowly drift across our mathematical 73-day Seasons. 
* Over the 243-year Era, the Solstice drifts by about **60 days** (roughly one lunar cycle per century). 
* Inside a single Octaeteris, the Solstice moves just **one day per 4 years**. 
* **Why this is a feature:** This drift is not an error to be patched with a "leap day." It is the physical breathing of the solar system, recorded perfectly on our octal tape. It turns the calendar into an observable ephemeris.

### 🕳️ Rabbit Hole 3: The 99-Moon Resonance and the Flipping Pentad
Why 73 days for a season? 
* A lunar cycle is 29.53 days. 2.5 lunar cycles = 73.8 days. 
* Our 73-day Pentad is almost exactly 2.5 moons. This means the Moon's phase **flips** (New to Full) every single season, shifting by just 1-2 days. 
* Over the 2,920-day Octaeteris, exactly **99 lunar months** occur. The Sun, Venus, and Moon are not perfectly locked, but they are singing from the same hymnal.

### 🕳️ Rabbit Hole 4: The Mayan Odometer
The 243-year Great Cycle is exactly 152 Venus synodic periods = 88,755.84 days. 
* Rounded to the nearest integer, this is **88,756 days**.
* In base-8, 88,756 is exactly **`0o255264`**.
* When the continuous counter hits `255264`, the 6-digit octal odometer rolls over to `000000`. And what happens in the physical sky at that exact moment? **The next 243-year cycle begins with the Transit of 2247.** The mathematical odometer and the physical astronomical event are in perfect, unbreakable lockstep.

---

## 🛠️ Usage & Ecosystem

### Installation
```bash
npm install octal-day
```

### Building a "Sky Clock"
Because the core logic requires zero external dependencies, it is perfect for low-power hardware. You can build an offline-first e-ink desk clock or a Raspberry Pi display that calculates local solar time purely from a GPS longitude and a real-time clock (RTC) module.

### The Generative Ephemeris Web-App
We are building a companion PWA that renders the 8-column octal grid. It allows you to navigate through the 88,756-day Era, overlaying the physical drift of the Solstices, the flipping of the Moon phases, and the 5-pointed pentagram of Venus conjunctions. It is a universal astronomically grounded time system in your pocket.

---

## 📜 License

**Copyright © 2024 davay42. All rights reserved.**

This software is a copyrighted authored material, published as a free-will practice of the author. You are warmly invited to observe, study, copy, and use this code for your **personal, non-commercial projects** without any fear of retaliation. 

This package is offered as a gift to the community of observers, makers, and dreamers. For institutional or commercial redistribution, please reach out to the author.

*Look up. The territory is still there.*