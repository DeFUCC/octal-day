<script setup>

import { recentSolstice, octaeteride, year, currentStart, dayCount, octaveCount, seasonCount, transits, jd0Astro, yearLength, startMoon, nextMoon, moonCycle, startSolstice, CALENDAR_EPOCH, yearsPassed, historicalTransits, dateToOctaDate, getMoonPhase } from '../astro.js';
import { now, astro, octaDays, octime, coord, dayFraction, octalDayFraction as odf, planets, moonPhases, colors } from '../useDay.js';
import { computed, onMounted, nextTick } from 'vue'

import { Elongation, Body, Seasons } from 'astronomy-engine'

onMounted(() => {
  nextTick(() => {
    today.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
})

const solstices = computed(() => Array(9).fill(null).map((_, i) => Seasons(currentStart.date.getFullYear() + i).jun_solstice.date.toLocaleDateString()))

</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.gap-2.flex.flex-col.items-center.overflow-y-scroll.my-2px.w-full 

  .grid.w-full.octave-grid.gap-1
    .w-8 #
    .flex.p-1.bg-orange-100.sticky.top-0.z-20(v-for="(p,pp) in planets") 
      span {{pp}}
      .flex-1
      span {{ p.slice(0,2)}}
  
    template(v-for="(oct, o) in 366")
      .p-1.bg-orange-100.sticky.left-0.z-20 {{o.toString(8)}}
      .p-1.flex.flex-col.rounded.border-1px.shadow-lg.hover-op-100.op-80.transition(v-for="(planet,p) in planets" :key="planet" :style="{backgroundColor: currentStart.AddDays(o*8+p).date.toLocaleDateString() == (new Date()).toLocaleDateString() ? 'orange': solstices.find((d)=>currentStart.AddDays(o*8+p).date.toLocaleDateString() ==d) ? 'yellow' : '#aa83', borderColor: colors[Math.floor((o*8+p)/73)%8]}" :id="currentStart.AddDays(o*8+p).date.toLocaleDateString() == (new Date()).toLocaleDateString() ? 'today' : ''") 
        .text-xs.op-30.font-mono {{currentStart.AddDays(o*8+p).date.toLocaleDateString()}}
        .font-mono.text-xs.op-60 D{{(o*8+p).toString(8)}}
        .font-normal s{{Math.floor((o*8+p)/73).toString(8)}}-d{{(o*8+p-Math.floor((o*8+p)/73)*73).toString(8)}} 
        .text-xs Y{{Math.floor(Math.floor((o*8+p)/73)/5).toString(8)}} V{{Math.floor(Math.floor((o*8+p)/73)/8).toString(8)}}{{Elongation(Body.Venus,currentStart.AddDays(o*8+p).date).visibility.slice(0,1).toUpperCase()}}
        .flex.gap-2.items-center
          .text-lg.op-90(:title="getMoonPhase(currentStart.AddDays(o*8+p)).age") {{moonPhases[Math.round(getMoonPhase(currentStart.AddDays(o*8+p).date).angle/360*8)%8]}} 
          .text-xs.op-50 {{(getMoonPhase(currentStart.AddDays(o*8+p).date).angle/360*8).toString(8).slice(0,4)}}
          .flex-1
          .text-xs.op-50 {{(Elongation(Body.Venus,currentStart.AddDays(o*8+p).date).elongation).toString(8).slice(0,4)}}
          .rounded-full.bg-red.w-3.h-3.shadow-lg(:style="{backgroundColor: Elongation(Body.Venus,currentStart.AddDays(o*8+p).date).visibility =='morning' ? 'yellow': 'lightblue'}")

</template>


<style scoped>
.octave-grid {
  grid-template-columns: minmax(2.5rem, 4rem) repeat(8, 1fr);
}
</style>