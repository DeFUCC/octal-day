<script setup>

import { recentSolstice, octaeteride, year, currentStart, dayCount, octaveCount, seasonCount, transits, jd0Astro, yearLength, startMoon, nextMoon, moonCycle, startSolstice, CALENDAR_EPOCH, yearsPassed, historicalTransits, dateToOctaDate, getMoonPhase } from '../../src/astro.js';
import { now, astro, octaDays, octime, coord, dayFraction, octalDayFraction as odf, planets, moonPhases } from '../../src/useDay.js';
import { computed } from 'vue'

import { Elongation, Body } from 'astronomy-engine'

</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.gap-2.flex.flex-col.items-center.overflow-y-scroll.my-2px.w-full

  .grid.w-full.octave-grid.gap-1
    .w-8 #
    .p-1.bg-orange-100.sticky.top-0.z-20(v-for="p in planets") {{ p.slice(0,2)}}
  
    template(v-for="(oct, o) in 366")
      .p-1.bg-orange-100.sticky.left-0.z-20 {{o.toString(8)}}
      .p-1.flex.flex-col.rounded(v-for="(planet,p) in planets" :key="planet" :style="{backgroundColor: currentStart.AddDays(o*8+p).date.toLocaleDateString() == (new Date()).toLocaleDateString() ? 'orange': '#fff1'}") 
        .text-xs.op-30.font-mono {{currentStart.AddDays(o*8+p).date.toLocaleDateString()}}
        .font-mono {{(o*8+p).toString(8)}}
        .font-bold {{Math.floor((o*8+p)/73).toString(8)}}-{{(o*8+p-Math.floor((o*8+p)/73)*73).toString(8)}} 
        .text-xs Y{{Math.floor(Math.floor((o*8+p)/73)/5).toString(8)}} V{{Math.floor(Math.floor((o*8+p)/73)/8).toString(8)}}{{Elongation(Body.Venus,currentStart.AddDays(o*8+p).date).visibility.slice(0,1).toUpperCase()}}
        .flex.gap-2.items-center
          .text-xs.op-50 {{moonPhases[Math.round(getMoonPhase(currentStart.AddDays(o*8+p).date).angle/360*8)%8]}}
          
          .rounded-full.bg-red.w-3.h-3.shadow-lg(:style="{backgroundColor: Elongation(Body.Venus,currentStart.AddDays(o*8+p).date).visibility =='morning' ? 'yellow': 'lightblue'}")

</template>


<style scoped>
.octave-grid {
  grid-template-columns: minmax(2.5rem, 4rem) repeat(8, 1fr);
}
</style>