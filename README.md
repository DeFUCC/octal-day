/*
# `octal-day` - Planetary Time Scale

[NPM](https://www.npmjs.com/package/octal-day)

A self-contained inner Solar system deep time octal timestamp grounding based on Earth-Venus orbital resonance and base-8 number patterns observation. Modern standard way to express octal numbers looks like this: `0o1245670` - a zero-oh prefix - the lemniscate `∞` - followed by 0-7 digits - the numerical octave notes. We can convert any number to octal right in the browser console via `73.0.toString(8)` and back as `Number('0o111')`, try it yourself! 

First published on `1-01-4321 37:16:44`.

~~~~~~js
*/
const D=864e5, E=88756, T=2920, P=262144, Dn=86400000000000n, Pn=68719476736n, E1=1338940800000;
const toNs = (t, tz) => typeof t=='bigint' ? t + BigInt(Math.round(tz*D))*1000000n : BigInt(Math.round(t + tz*D))*1000000n;

export function octalDay (t=Date.now(), tz=-new Date().getTimezoneOffset()/1440, ep=E1, eo=1)  {
  let ns = toNs(t, tz) - BigInt(ep)*1000000n, d = ns/Dn, r = ns%Dn; if (r<0n) {d--;r+=Dn}
  let eraBig = d/BigInt(E), eraRem = d%BigInt(E); if(eraRem<0n){eraBig--;eraRem+=BigInt(E)}
  let e = Number(eraBig)+eo, rm = Number(eraRem); let o = (r*Pn/Dn).toString(8).padStart(12,'0'), hi = typeof t=='bigint';
  return `${e.toString(8)}-${(rm/T|0).toString(8).padStart(2,'0')}-${(rm%T).toString(8).padStart(4,'0')} ${o.slice(0,2)}:${o.slice(2,4)}:${o.slice(4,6)}${hi?'.'+o.slice(6,8)+':'+o.slice(8,10)+':'+o.slice(10,12):''}`;
};

export function octalDate (s, tz=-new Date().getTimezoneOffset()/1440, ep=E1, eo=1) {
  let [dt,tm]=s.split(' '), [e,t,d]=dt.split('-'), [std,mic]=tm.split('.');
  let days=(parseInt(e,8)-eo)*E+parseInt(t,8)*T+parseInt(d,8), [p1,p2,p3]=std.split(':');
  if (mic) {let [p4,p5,p6]=mic.split(':'); return BigInt(days)*Dn - BigInt(Math.round(tz*D))*1000000n + (BigInt(parseInt(p1+p2+p3,8))*BigInt(P) + BigInt(parseInt(p4+p5+p6,8)))*Dn/Pn + BigInt(ep)*1000000n;}
  return (days + tz + parseInt(p1+p2+p3,8)/P)*D + ep + 164.7949;
};
/*
~~~~~~

***

## ⚙️ Algorithm & API Reference

The core API consists of two perfectly reversible functions that translate between continuous timestamps and octal addresses, preserving precision end-to-end.

### Algorithm Explanation

`octalDay` normalizes the input (`Number` for milliseconds, `BigInt` for nanoseconds) into exact nanoseconds, subtracts the epoch and timezone offsets, and uses safe floor-division to extract the Era, Transit, and Day counters (keeping remainders positive for negative deep-time dates). It then maps the sub-day nanosecond remainder into a 12-digit base-8 fraction, outputting either a 6-digit human clock or a 12-digit micro-scale based on the input's precision. 

Conversely, `octalDate` reverses this by parsing the canonical string into base-8 segments, scaling them by orbital constants ($88,756$ and $2,920$ days) and fractional powers of 8 ($8^6$ or $8^{12}$), and reapplying offsets to reconstruct the exact continuous timestamp. It dynamically returns a `Number` (ms) or `BigInt` (ns) to perfectly match the precision of the original input.

### Usage

```javascript
import { octalDay, octalDate } from 'octal-day';

// 1. Standard Precision (Milliseconds)
const tzOffset = new Date().getTimezoneOffset() / 1440; // e.g., -0.333 for UTC+8
const ms = Date.now();
const strMs = octalDay(ms, tzOffset); 
// → "1-01-4321 41:74:47"

const originalMs = octalDate(strMs, tzOffset); 
// → 1700000000000 (Number)


// 2. High Precision (Nanoseconds)
const longOffset = -longitude / 360; // e.g., -120 / 360 = -0.333 for 120°E
const ns = process.hrtime.bigint(); // or getBrowserNs()
const strNs = octalDay(ns, longOffset); 
// → "1-01-4321 41:74:47.12:53:60"

const originalNs = octalDate(strNs, longOffset); 
// → 1700000000000123456n (BigInt)
```

### Parameters

*   **`t`** (`Number` | `BigInt`): A continuous timestamp. `Number` is interpreted as milliseconds (e.g., `Date.now()`), while `BigInt` is interpreted as nanoseconds (e.g., `process.hrtime.bigint()`). Defaults to `Date.now()`.
*   **`tz`** (`Number`): The local timezone offset in *fractional days*. 
    *   From system clock: `new Date().getTimezoneOffset() / 1440`
    *   From geographic longitude: `-longitude / 360` *(Negative for East, Positive for West)*. 
    *   Defaults to `0` (UTC).
*   **`ep`** (`Number`): The Epoch anchor in milliseconds. Defaults to `1338940800000` (2012-06-06 local midnight).
*   **`eo`** (`Number`): The Era offset integer. Defaults to `1` (aligning 2012 with Era 1, making 1769-2012 Era -1).

***

## The planetary resonance

The system expresses deep time through recursive octal subdivisions, creating a compact and memorable temporal address. Let's start from basic astronomy. Here's what Wikipedia says:

> When the geocentric ecliptic longitude of Venus coincides with that of the Sun, it is in conjunction with the Sun – inferior if Venus is nearer and superior if farther. The average period between successive Venus conjunctions of one type is 584 days – one synodic period of Venus. Five synodic periods of Venus is almost exactly 13 sidereal Venus years and 8 Earth years, and consequently the longitudes and distances almost repeat. [wiki](https://en.wikipedia.org/wiki/Orbit_of_Venus)

- Solar year is `~365` days long = `0o555` octal days
- Venus synodic period is `~584` days = `0o1110` octal days
- The resonant 5:8:13 alignment of the Venus Octaeteris is `~2920` days = `0o5550` octal days
- The common divisor of both cycles is prime `73` days = `0o111` - the octal repunit - 5 in the Sun and 8 in the Venus cycles

> In Ancient Greek astronomy, an octaeteris (Greek: ὀκταετηρίς, plural: octaeterides) is the period of eight solar years after which the moon phase occurs on the same day of the year plus one or two days. This period is also in a very good synchronicity with five Venusian visibility cycles (the Venusian synodic period) and thirteen Venusian revolutions around the Sun (Venusian sidereal period). This means, that if Venus is visible beside the Moon, after eight years the two will be again close together near the same date of the calendar. [wiki](https://en.wikipedia.org/wiki/Octaeteris)

- Moon cycle is `~29.5` = `0o35.4`,
- Moon Octaeteris is `~29.5*99=2923.528230` = `0o5553.416350` 
- With a rule of thumb `29.5*2.5=73.75` = `0o35.4*0o2.4=0o111.65` 

> The octaeteris, also known as oktaeteris, was noted by Cleostratus in ancient Greece as a ⁠2 923+ 1 /2⁠ day cycle. The octaeteris is the calendar used for the Olympic games; if one Olympiad was 50 months long, the next would be 49 lunar months long. This octaeteris calendar is used for the Olympic dial of the [Antikythera mechanism](https://en.wikipedia.org/wiki/Antikythera_mechanism), to determine the time of the Olympic games and other Greek festivities. [wiki](https://en.wikipedia.org/wiki/Octaeteris) 

- Tropical year x	8  =	`2 921.93754` = `0o5551.74001237055304`
- Synodic lunar month x	99 =	`2 923.528230` = `0o5553.4163502463542`
- Sidereal lunar month x	107 =  `2 923.417787` = `0o5553.32572026573306`
- Venusian synodic period x	5 =  `2 919.6` = `0o5547.46314631463146`
- Venusian sidereal period x	13 =  `2 921.07595` =`0o5551.04670565434206`

> The 3.4° inclination of Venus's orbit is great enough to usually prevent the inferior planet from passing directly between the Sun and Earth at inferior conjunction. Such solar transits of Venus rarely occur, but with great predictability and interest.  [wiki](https://en.wikipedia.org/wiki/Orbit_of_Venus)

> Venus has a very well observed and predictable orbit. From the perspective of all but the most demanding, its orbit is simple. An equation in Astronomical Algorithms that assumes an unperturbed elliptical orbit predicts the perihelion and aphelion times with an error of a few hours. Using orbital elements to calculate those distances agrees to actual averages to at least five significant figures. Formulas for computing position straight from orbital elements typically do not provide or need corrections for the effects of other planets. [wiki](https://en.wikipedia.org/wiki/Orbit_of_Venus)

- First recorded Summer transit observed by Lomonosov: `1761-06-06T05:19:00Z`/`-6581846460000`
- Second transit in this pair, obseved by Cook, opened Era 0: `1769-06-03T22:25:00Z`/`-6329583300000`
- First Summer transit broadcasted by live video to be observed: by everyone `2004-06-08T08:20:00Z`/`1086682800000`
- Second transit in the pair, observed while Venus Express was orbiting the planet, starts the Era 1: `2012-06-06T01:29:00Z`/`1338946140000`
- Next Summer transit to observe in the future: `2247-06-11T11:33:00Z`/`8755212780000`
- The closing Transit of the Era 1, beginning of Era 2: `2255-06-09T04:38:00Z`/`9007475880000`


> Transits of Venus reoccur periodically. A pair of transits takes place eight years apart in December (Gregorian calendar) followed by a gap of 121.5 years, before another pair occurs eight years apart in June, followed by another gap, of 105.5 years. The dates advance by about two days per 243-year cycle. The periodicity is a reflection of the fact that the orbital periods of Earth and Venus are close to 8:13 and 243:395 commensurabilities. The last pairs of transits occurred on 8 June 2004 and 5–6 June 2012. The next pair of transits will occur on 10–11 December 2117 and 8 December 2125. A transit lasts approximately 6 hours. [wiki](https://en.wikipedia.org/wiki/Transit_of_Venus)

- Venus Transit cycle repeats every `~88756` days = `0o255264` - six digit deep time

## Venus Transit Era

UNIX timestamp, counting milliseconds continuously since 1 January 1970 - an technical decision, not connected to any observed time anchors. Now as we have obtained the pair of the Venus transit with all the atomic clock slow motion video capture high tech already in place at 2004 and 2012, and also we have preserved clearly dated artifacts from previous transit pair in T1 1761 and T2 1769 - so we can say that we've covered our Era 0 and are already about 5% in the Era 1.

When does our Era start? At the peak of the 2012 Venus transit. It's the moment we obtained the exact timestamp of the second transit in the pair when complex celestial calculations of inferior conjunctions boiled down to the timestamp of the Epoch event at T3 `1338946140000` peak transit. And it starts counting continuous days till next closing transit of the years 2247/2255 at T5 `8755212780000` after `88,756` days or `0o255264`, then resets to zero, while incrementing the Era counter. So to ground a timestamp in deep orbital time we essentially just need to subtract the Epoch from it, then take our first rounding `Math.floor(((Date.now()-1338946140000)/86400000)/88756)+1` for era label (we add 1 to revere to the early science efforts) and modulo `((Date.now()-1338946140000)/86400000)%88756` to get our day in the current era. Everything else is rounding and modulo operations in octal. 

## Octaeteris resonance

The resonant period of 5 synodic cycles of Venus, 8 Earth years and 99 Moons points to the single octal number, that organizes the complex relations of celestial bodies into the grid of `0o5550` days and 1-3 day offsets that govern each of the bodies slow observable movement across this grid. So we can get the Transit/octaeTeris number by division: `((Date.now()-1338946140000)/86400000)%88756/2920`.

## The Petal Number

Also known as "Sheldon Cooper Number" - **73** is the 21st prime number. Its mirror (37) is the 12th and its mirror (21) is the product of multiplying 7 and 3. And it's the only repunit prime `0o111` in octal.

## Full scale

| Level | Duration | Octal Rep | Description |
| :--- | :--- | :--- | :--- |
| **Era** | 88,756 days | `0o255264` | The 243-year Venus transit cycle. |
| **Transit** | 2,920 days | `0o5550` | The 8-year Octaeteris (Venus/Solar resonance). |
| **Petal** | 73 days | `0o111` | 1/40th of a Transit. |
| **Octave** | 8 days | `0o10` | The continuous, unbroken weekly rhythm. |
| **Day** | 1 day | `0o1` | One local solar day. |
| **Octant** | 1/8 day | `10:00:00` | Three hour part of the day |
| **Session** | 1/8 octant | `01:00:00` | 22.5 minute time span of focus |
| **Topic** | 1/8 session | `00:10:00` | 2.8 minute meaning block |
| **Turn** | 1/8 topic | `00:01:00` | 21 seconds coherent activity |
| **Phrase** | 1/8 turn | `00:00:10` | 2.6 seconds unit of action  |
| **Beat** | 1/8 phrase | `00:00:01` | 0.33 seconds core Earth rotation rhythm |

A complete temporal address looks like: `[Era]-[Transit]-[Day] [OctantSession]:[TopicTurn]:[PhraseBeat]`

**Example Octal Day Time:** `1-01-4321 01:03:63`

### ⏱️ Time Fraction

The sub-day time is tracked as a 6-digit base-8 fraction of a day, formatted into three pairs (`[OctantSession]:[TopicTurn]:[PhraseBeat]`). Each pair represents 1/64th (8^2) of the previous unit. 

Let's read this example time of day `41:74:47`. The most valid way is to just read the numbers digit by digit with a slight pause between pairs - `Four one, seven four, four seven`. A more contextual way is to say: `Topic four one, turn seven four, beat four seven.`. Or we can name each digit up to the precision we need for the purpose: `Octant four, session one, topic seven, turn four`. We can schedule a community event on the same day next octave for the duration of the octant five, and instantly establish 8 synchronized sessions with 64 topics to discuss in a total of 512 turns available to fill with activities.

---

## 📍 The Epoch & Resonance Drift

### The Epoch

The calendar is currently in **Era 1**, anchored to the **June 6, 2012 Venus Transit** (`2012-06-06T00:00:00Z`). This marks the second half of the most recent Venus transit pair (2004/2012). 
*   **Era 0** corresponds to the historical 1761/1769 transit pair.
*   **Era 1** spans 88,756 days (~243 years), ending with the next transit pair in 2247/2255.

The Venus transit cycle is anchored by a near-exact orbital resonance between Earth and Venus. Over **88756 days** (243.0008 years), Earth completes 243 sidereal orbits while Venus completes 395, yielding exactly **152 inferior conjunctions** — the synodic beat between the two planets. Within this cycle, transits occur in pairs separated by **2920 days** (7.995 years), the interval required for Venus to lap Earth by roughly 21.5 degrees of heliocentric longitude and return to the same orbital node. These two numbers are not approximations: across the 951 standard eras in the Solex dataset, the Venus Era holds to 88756.04 ± 0.42 days, and the pair interval to 2920.00 ± 0.25 days. The resonance is stable because the ratio 395:152 (≈ 2.59868) differs from the true period ratio by only 0.001%, locking the pattern in place.

Projecting forward and backward from the dataset's boundaries requires tracking when orbital perturbations — chiefly from Jupiter and secular changes in Earth's eccentricity — push Venus just far enough from the node to skip a transit. The standard deviation of 0.42 days per era implies a drift of roughly 1 part in 210,000 per cycle. At this pace, the 88756-day alignment remains valid for approximately **±3000 cycles**, or roughly **±730,000 years** from any well-anchored epoch, before a single miss becomes statistically likely. The 2920-day pair interval is even more robust, as it depends only on the synodic period and nodal precession over eight years; it should hold to within a day for well over **±1 million years**. Beyond these horizons, cumulative planetary perturbations and the slow variation of the obliquity will gradually shift the resonance, but within the Solex span of 100,000 BC to 100,000 AD, both numbers remain astronomically guaranteed.

### 🪐 The Astronomical Octave: A Pure Planetary Mapping

Instead of arbitrary mythological names, the base-8 rhythm of `octal-day` is mapped to the 8 planets of the Solar System, ordered by their heliocentric distance (0 to 7). This creates a mnemonic framework where the "feel" of a time period directly corresponds to the physical reality of the planet that governs it.

| Index | Planet | Orbital Period | Astronomical Role | Temporal Association |
| :---: | :--- | :--- | :--- | :--- |
| **`0`** | **Mercury** | 88 days | The swift inner messenger. | **Initiation & Speed.** Rapid cycles, new beginnings, high-frequency action. |
| **`1`** | **Venus** | 225 days | The resonant anchor (584d synodic). | **Harmony & Alignment.** Settling into rhythm, beauty, the core beat of the system. |
| **`2`** | **Earth** | 365 days | The observer’s platform. | **Grounding & Reality.** Local observation, baseline measurement, tangible work. |
| **`3`** | **Mars** | 687 days | The first external perturbation. | **Action & Friction.** The turning point, energy expenditure, overcoming resistance. |
| **`4`** | **Jupiter** | ~12 years | The gravitational anchor of the system. | **Expansion & Macro-View.** The midpoint, broad perspective, growth and scaling. |
| **`5`** | **Saturn** | ~29.5 years | The boundary setter. | **Structure & Consolidation.** Slowing down, refining, building lasting frameworks. |
| **`6`** | **Uranus** | ~84 years | The axis of deviation. | **Innovation & Variance.** Introducing long-term shifts, breaking old patterns (e.g., lunar drift). |
| **`7`** | **Neptune** | ~165 years | The outermost horizon. | **Deep Time & Dissolution.** Rest, cosmic perspective, preparing for the cycle's reset. |

---

### How the Planets Map to the Fractal Scales

Because the system is strictly base-8, this 0–7 planetary index seamlessly scales across every level of the calendar:

#### 1. The 8 Days of the Octave (Weekly Rhythm)

*   **Day 0 (Mercury):** Fast-paced, clearing the deck, starting new micro-projects.
*   **Day 1 (Venus):** Finding flow, collaborative work, aesthetic focus.
*   **Day 2 (Earth):** Grounded, practical execution, dealing with local reality.
*   **Day 3 (Mars):** High energy, tackling the hardest tasks, pushing through friction.
*   **Day 4 (Jupiter):** Mid-week expansion, strategic planning, stepping back to see the big picture.
*   **Day 5 (Saturn):** Structuring, organizing, tying up loose ends, disciplined focus.
*   **Day 6 (Uranus):** Experimental, trying new approaches, breaking the weekly routine.
*   **Day 7 (Neptune):** Deep rest, reflection, dissolving the week’s stress, preparing for the Mercury reset.

#### 2. The 8 Octaves of the 73-Day Petal (Monthly Rhythm)

A Petal is 73 days, which contains exactly **8 Core Octaves (64 days)** plus a 9-day "glue" period that absorbs the 1-day shift every petal keeping the core 8x8 block aligned with octave grid.

*   **Octaves 0–3 (Mercury to Mars):** The rapid, active first half of the Petal.
*   **Octaves 4–7 (Jupiter to Neptune):** The expansive, consolidating second half, culminating in the Neptune drift days where the lunar cycle realigns for the next Petal.

#### 3. The 8 Years of the Octaeteris 
Each year of the 8-year cycle takes on the character of its corresponding planet, from the swift, reactive Year 0 (Mercury) to the slow, culminating, and deeply reflective Year 7 (Neptune), before the cycle resets to 0.


---

## 📜 License & Philosophy

**Copyright © 2026 davay42. All rights reserved.**

This software is a copyrighted authored material, published as a free-will practice of the author. You are warmly invited to observe, study, copy, and use this code for your **personal and non-commercial projects** without any fear of retaliation or legal friction. 

This package is offered as a gift to the community of observers, makers, and dreamers. For institutional or commercial redistribution, please reach out to the author to discuss terms. 

*Look up. The territory is still there.*

*/