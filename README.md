# `octal-day`

A self-contained inner Solar system deep time octal timestamp grounding based on Earth-Venus orbital resonance and base-8 number patterns observation. Modern standard way to express octal numbers looks like this: `0o1245670` - a zero-oh prefix - the lemniscate `∞` - followed by 0-7 digits - the numerical octave notes. We can convert any number to octal right in the browser console via `73.0.toString(8)` and back as `Number('0o111')`, try it yourself! So now let's look at the numbers:

---

## The planetary resonance

The system expresses deep time through recursive octal subdivisions, creating a compact and memorable temporal address. Let's start from basic astronomy. Here's what Wikipedia says:

> When the geocentric ecliptic longitude of Venus coincides with that of the Sun, it is in conjunction with the Sun – inferior if Venus is nearer and superior if farther. The average period between successive Venus conjunctions of one type is 584 days – one synodic period of Venus. Five synodic periods of Venus is almost exactly 13 sidereal Venus years and 8 Earth years, and consequently the longitudes and distances almost repeat.

- Solar year is `~365` days long = `0o555` octal days
- Venus synodic period is `~584` days = `0o1110` octal days
- The resonant 5:8:13 alignment of the Venus Octaeteris is `~2920` days = `0o5550` octal days
- The common divisor of both cycles is prime `73` days = `0o111` - the octal repunit - 5 in the Sun and 8 in the Venus cycles

> In Ancient Greek astronomy, an octaeteris (Greek: ὀκταετηρίς, plural: octaeterides) is the period of eight solar years after which the moon phase occurs on the same day of the year plus one or two days. This period is also in a very good synchronicity with five Venusian visibility cycles (the Venusian synodic period) and thirteen Venusian revolutions around the Sun (Venusian sidereal period). This means, that if Venus is visible beside the Moon, after eight years the two will be again close together near the same date of the calendar.

- Moon cycle is `~29.5` = `0o35.4`,
- Moon Octaeteris is `~29.5*99=2923.528230` = `0o5553.416350` 
- With a rule of thumb `29.5*2.5=73.75` = `0o35.4*0o2.4=0o111.65` 

> The octaeteris, also known as oktaeteris, was noted by Cleostratus in ancient Greece as a ⁠2 923+ 1 /2⁠ day cycle. The octaeteris is the calendar used for the Olympic games; if one Olympiad was 50 months long, the next would be 49 lunar months long. This octaeteris calendar is used for the Olympic dial of the Antikythera mechanism, to determine the time of the Olympic games and other Greek festivities.

- Tropical year x	8  =	`2 921.93754` = `0o5551.74001237055304`
- Synodic lunar month x	99 =	`2 923.528230` = `0o5553.4163502463542`
- Sidereal lunar month x	107 =  `2 923.417787` = `0o5553.32572026573306`
- Venusian synodic period x	5 =  `2 919.6` = `0o5547.46314631463146`
- Venusian sidereal period x	13 =  `2 921.07595` =`0o5551.04670565434206`

> The 3.4° inclination of Venus's orbit is great enough to usually prevent the inferior planet from passing directly between the Sun and Earth at inferior conjunction. Such solar transits of Venus rarely occur, but with great predictability and interest. 

> Venus has a very well observed and predictable orbit. From the perspective of all but the most demanding, its orbit is simple. An equation in Astronomical Algorithms that assumes an unperturbed elliptical orbit predicts the perihelion and aphelion times with an error of a few hours. Using orbital elements to calculate those distances agrees to actual averages to at least five significant figures. Formulas for computing position straight from orbital elements typically do not provide or need corrections for the effects of other planets.

> Transits of Venus reoccur periodically. A pair of transits takes place eight years apart in December (Gregorian calendar) followed by a gap of 121.5 years, before another pair occurs eight years apart in June, followed by another gap, of 105.5 years. The dates advance by about two days per 243-year cycle. The periodicity is a reflection of the fact that the orbital periods of Earth and Venus are close to 8:13 and 243:395 commensurabilities. The last pairs of transits occurred on 8 June 2004 and 5–6 June 2012. The next pair of transits will occur on 10–11 December 2117 and 8 December 2125. A transit lasts approximately 6 hours.

- Venus Transit cycle repeats every `~88756` days = `0o255264` - six digit deep time

## Timestamp grounding

### Venus Transit Era

UNIX timestamp, counting milliseconds continuously since 1 January 1970 - an technical decision, not connected to any observed time anchors. Now as we have obtained the pair of the Venus transit with all the atomic clock slow motion video capture high tech already in place at 2004 and 2012, and also we have preserved clearly dated artifacts from previous transit pair in T1 1761 and T2 1769 - so we can say that we've covered our Era 0 and are already about 5% in the Era 1.

When does our Era start? At the peak of the 2012 Venus transit. It's the moment we obtained the exact timestamp of the second transit in the pair when complex celestial calculations of inferior conjunctions boiled down to the timestamp of the Epoch event at T3 `1338946140000` peak transit. And it starts counting continuous days till next closing transit of the years 2247/2255 at T5 `8755212780000` after `88,756` days or `0o255264`, then resets to zero, while incrementing the Era counter. So to ground a timestamp in deep orbital time we essentially just need to subtract the Epoch from it, then take our first rounding `Math.floor(((Date.now()-1338946140000)/86400000)/88756)+1` for era label (we add 1 to revere to the early science efforts) and modulo `((Date.now()-1338946140000)/86400000)%88756` to get our day in the current era. Everything else is rounding and modulo operations in octal. 

## Octaeteris resonance

The resonant period of 5 synodic cycles of Venus, 8 Earth years and 99 Moons points to the single octal number, that organizes the complex relations of celestial bodies into the grid of `0o5550` days and 1-3 day offsets that govern each of the bodies slow observable movement across this grid. So we can get the Transit/octaeTeris number by division: `((Date.now()-1338946140000)/86400000)%88756/2920`.

## Full scale

| Marker | Level | Duration | Octal Rep | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`e`** | **Era** | 88,756 days | `0o255264` | The 243-year Venus transit cycle. |
| **`t`** | **Transit** | 2,920 days | `0o5550` | The 8-year Octaeteris (Venus/Solar resonance). |
| **`p`** | **Petal** | 73 days | `0o111` | 1/40th of a Transit. |
| **`v`** | **Octave** | 8 days | `0o10` | The continuous, unbroken weekly rhythm. |
| **`d`** | **Day** | 1 day | `0o1` | One local solar day. |

 73 is the 21st prime number. Its mirror (37) is the 12th and its mirror (21) is the product of multiplying 7 and 3. And it's octal prime repunit 0o111.

A complete temporal address looks like: `[era]-[transit]-[day] [time]`

**Example Address:** `1-01-4321 01:03:63`

### 🧮 Octal Elegance

The durations were not chosen arbitrarily; they are mathematically native to the base-8 system:
*   **Octave (8 days)** is exactly `0o10`. This means dividing a Transit by an Octave in base-8 simply removes the last digit. The "Octave Index" and "Day of the Octave" are natively separated by the radix point in the octal string.
*   **Petal (73 days)** is exactly `0o111`. 
*   **Transit (2,920 days)** is exactly `0o5550`. Notice how 5 Venus synodic cycles (584 days × 5 = 2920) and 8 Solar years (365 days × 8 = 2920) perfectly resolve to `0o5550`.

### ⏱️ Time Fraction
The sub-day time is tracked as a 6-digit base-8 fraction of a day, formatted into three pairs (`xx:xx:xx`). Each pair represents $1/64$th ($8^2$) of the previous unit:
*   **Octant** (First pair): $24\text{h} / 64 = \mathbf{22.5\text{ minutes}}$
*   **Session** (Second pair): $22.5\text{m} / 64 \approx \mathbf{21.1\text{ seconds}}$
*   **Beat** (Third pair): $21.1\text{s} / 64 \approx \mathbf{0.33\text{ seconds}}$

---

## 📍 The Epoch & Resonance Drift

### The Epoch
The calendar is currently in **Era 1**, anchored to the **June 6, 2012 Venus Transit** (`2012-06-06T00:00:00Z`). This marks the second half of the most recent Venus transit pair (2004/2012). 
*   **Era 0** corresponds to the historical 1761/1769 transit pair.
*   **Era 1** spans 88,756 days (~243 years), ending with the next transit pair in 2247/2255.

The Venus transit cycle is anchored by a near-exact orbital resonance between Earth and Venus. Over **88756 days** (243.0008 years), Earth completes 243 sidereal orbits while Venus completes 395, yielding exactly **152 inferior conjunctions** — the synodic beat between the two planets. Within this cycle, transits occur in pairs separated by **2920 days** (7.995 years), the interval required for Venus to lap Earth by roughly 21.5 degrees of heliocentric longitude and return to the same orbital node. These two numbers are not approximations: across the 951 standard eras in the Solex dataset, the Venus Era holds to 88756.04 ± 0.42 days, and the pair interval to 2920.00 ± 0.25 days. The resonance is stable because the ratio 395:152 (≈ 2.59868) differs from the true period ratio by only 0.001%, locking the pattern in place.

Projecting forward and backward from the dataset's boundaries requires tracking when orbital perturbations — chiefly from Jupiter and secular changes in Earth's eccentricity — push Venus just far enough from the node to skip a transit. The standard deviation of 0.42 days per era implies a drift of roughly 1 part in 210,000 per cycle. At this pace, the 88756-day alignment remains valid for approximately **±3000 cycles**, or roughly **±730,000 years** from any well-anchored epoch, before a single miss becomes statistically likely. The 2920-day pair interval is even more robust, as it depends only on the synodic period and nodal precession over eight years; it should hold to within a day for well over **±1 million years**. Beyond these horizons, cumulative planetary perturbations and the slow variation of the obliquity will gradually shift the resonance, but within the Solex span of 100,000 BC to 100,000 AD, both numbers remain astronomically guaranteed.


---

## ⚙️ API Reference

The core API consists of two reactive, reversible functions that translate between standard UNIX timestamps and octal addresses.

```javascript
import { useDay, useDate } from 'octal-day';

// 1. Convert a UNIX timestamp to the octal structure
const { raw, octal, render } = useDay(Date.now(), offset);

console.log(render.era);     // e.g., "E1-D012071"
console.log(render.petal);   // e.g., "e1-t01-p36-d103"
console.log(render.time);    // e.g., "01:03:63"

// 2. Convert an octal address string back to a JavaScript Date object
const originalDate = useDate('e1-t01-p36-d103.01:03:63', offset);
```

### Parameters
*   `timestamp` (Number): A standard UNIX timestamp in milliseconds. Defaults to `Date.now()`.
*   `address` (String): The octal address string. The parser intelligently extracts markers (`e`, `t`, `p`, `v`, `d`) regardless of casing or formatting.
*   `offset` (Number): The timezone offset in *fractional days* (e.g., `offset = (timezoneOffset * 60000) / 86400000`). Defaults to `0` (UTC).

---

## 🎯 Use Cases

*   **Personal Timekeeping:** Tracking ecological changes, gardening, and personal rhythms aligned with the true solar day and lunar phases.
*   **Astronomical Logging:** A native, base-8 framework for recording observations, transit events, and orbital mechanics.
*   **Hardware Projects:** Powering offline-first, e-ink desk clocks or Raspberry Pi displays that show local solar time without relying on network time protocols.
*   **Symbolic Exploration:** Mapping octal digits to combinatorial systems (like I Ching trigrams/hexagrams) to create mnemonic, multi-modal temporal addresses.

---

## 📜 License & Philosophy

**Copyright © 2026 davay42. All rights reserved.**

This software is a copyrighted authored material, published as a free-will practice of the author. You are warmly invited to observe, study, copy, and use this code for your **personal and non-commercial projects** without any fear of retaliation or legal friction. 

This package is offered as a gift to the community of observers, makers, and dreamers. For institutional or commercial redistribution, please reach out to the author to discuss terms. 

*Look up. The territory is still there.*