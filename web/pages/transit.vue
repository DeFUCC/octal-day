<script setup>

import { recentSolstice, octaeteride, year, currentStart, dayCount, octaveCount, seasonCount, transits, jd0Astro, yearLength, moonQuarter, nextMoon, moonCycle } from '../../src/astro.js';
import { now } from '../../src/useDay.js';
import { computed } from 'vue'



</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.p-4.gap-2.flex.flex-col.overflow-y-scroll.text-sm
  p What time is it? Let's find out!
  p The astronomical epoch for modern ephemeris starts on <b>{{jd0Astro.date.toLocaleDateString()}}</b>. First let's find the first pair of Venus transits in this new epoch: they happened on <b>{{transits[0].peak.date.toLocaleDateString()}}</b> and <b>{{transits[1].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[1].peak.ut-transits[0].peak.ut).toFixed(2)}}</b> days passed between. It's the Venus Octaeteris - the <b>5</b> Venus synodic cycles of <b>{{((transits[1].peak.ut-transits[0].peak.ut)/5).toFixed(4)}}</b> days each. But also notice, that it's just <b>{{(yearLength*8-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(4)}}</b> days less than exactly <b>8</b> solar years of <b>{{yearLength.toFixed(4)}} days</b> - the Solar Octaeteris of <b>{{(yearLength*8).toFixed(4)}}</b> days. This is also quite close to <b>100</b> Moon cycles of {{moonCycle.toFixed(4)}} days - <b>{{(moonCycle*100).toFixed(4)}}</b>.

  p Years passed: {{octaeteride}} octaeteris and {{year}} years
  p Start: {{currentStart}}
  p Today: {{now.toUTCString()}}
  p Total days: 0o{{dayCount.toString(8)}}/0o{{(2920).toString(8)}}
  p Octave:  {{dayCount%8}}th day of 0o{{octaveCount.toString(8)}}/0o{{(2920/8).toString(8)}} octave
  p Seasons: 0o{{(dayCount-seasonCount*73).toString(8)}} day of  0o{{seasonCount.toString(8)}}/0o{{(40).toString(8)}} season that started on day 0o{{(seasonCount*73).toString(8)}}



</template>