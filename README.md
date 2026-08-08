# `octal-day`

A self-contained, observer-based time system grounded in the octal number system, Solar system cycle observation, and personal-level recording. 

This package provides a parallel framework for tracking time through direct astronomical observation rather than inherited numerical conventions. It is designed to coexist peacefully with any existing civil time standard, serving as a complementary lens for those who wish to align their personal rhythms with the observable sky.

---

## 🌌 The Scaling Hierarchy

The system expresses time through a recursive, base-8 (octal) subdivision, creating a compact and memorable temporal address. 

| Marker | Level | Duration | Octal Rep | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`e`** | **Era** | 88,756 days | `0o255264` | The 243-year Venus transit cycle. |
| **`t`** | **Transit** | 2,920 days | `0o5550` | The 8-year Octaeteris (Venus/Solar resonance). |
| **`p`** | **Petal** | 73 days | `0o111` | 1/40th of a Transit. |
| **`v`** | **Octave** | 8 days | `0o10` | The continuous, unbroken weekly rhythm. |
| **`d`** | **Day** | 1 day | `0o1` | One local solar day. |

A complete temporal address looks like: `e[era]-t[transit]-p[petal]-v[octave]-d[day].[time]`

**Example Address:** `e1-t01-p36-v10-d3.01:03:63`

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

### Resonance Drift
The system embraces the natural mechanics of the cosmos. Only the Solar backbone is strictly corrected; the rest are observed as beautiful, drifting harmonies:
*   **Solar Orbit (The Backbone):** The system observes the actual Summer Solstice and resets the boundary at the preceding local midnight. This prevents any seasonal drift.
*   **Venus Cycle:** 5 synodic cycles equal ~2919.6 days. This drifts by ~0.4 days relative to the 2920-day mathematical anchor per Transit, accumulating to a full nodal shift over the 243-year Era.
*   **Lunar Cycle:** 99 synodic months equal ~2923.5 days. This drifts ~1.6 days longer than the 8-year solar frame. Consequently, the lunar phase beautifully *flips* with each 73-day Petal, shifting by just 1–2 days over two Petals.

---

## ⚙️ API Reference

The core API consists of two reactive, reversible functions that translate between standard UNIX timestamps and octal addresses.

```javascript
import { useDay, useDate } from 'octal-day';

// 1. Convert a UNIX timestamp to the octal structure
const { raw, octal, render } = useDay(Date.now(), offset);

console.log(render.era);     // e.g., "E1-D012071"
console.log(render.petal);   // e.g., "e1-t01-p36-v10-d3"
console.log(render.time);    // e.g., "01:03:63"

// 2. Convert an octal address string back to a JavaScript Date object
const originalDate = useDate('e1-t01-p36-v10-d3.01:03:63', offset);
```

### Parameters
*   `timestamp` (Number): A standard UNIX timestamp in milliseconds. Defaults to `Date.now()`.
*   `address` (String): The octal address string. The parser intelligently extracts markers (`e`, `t`, `p`, `v`, `d`) regardless of casing or formatting.
*   `offset` (Number): The timezone offset in *fractional days* (e.g., `offset = (timezoneOffset * 60000) / 86400000`). Defaults to `0` (UTC).

---

## 🛠️ Framework Integration (Vue 3)

Because `useDay` returns a plain object, it pairs perfectly with reactive frameworks. Here is how to build a live-updating Octal clock in Vue 3 using `@vueuse/core`:

```html
<script setup>
import { useNow } from '@vueuse/core'
import { computed } from 'vue'
import { useDay, useDate } from 'octal-day'

const now = useNow()
const day = computed(() => useDay(now.value.getTime()))
</script>

<template>
  <h1>Current Era: {{ day.render.era }}</h1>
  <h2>Petal Address: {{ day.render.petal }}</h2>
  <p>Time: {{ day.render.time }}</p>
</template>
```

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
```