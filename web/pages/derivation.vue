<script setup>

import { recentSolstice, octaeteride, era, octaeteris, year, currentStart, dayCount, octaveCount, seasonCount, transits, jd0Astro, yearLength, startMoon, nextMoon, moonCycle, startSolstice, CALENDAR_EPOCH, yearsPassed, historicalTransits } from '../../src/astro.js';
import { now, astro, octaDays, octime, coord, dayFraction, octalDayFraction as odf } from '../../src/useDay.js';
import { computed } from 'vue'

function octal(n, s) {
  const oct = n.toString(8)
  if (s) { return oct.slice(0, s) } else { return oct }
}


async function getLocation() {
  let position
  try {
    position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
    });
    coord.value.longitude = position.coords.longitude
    coord.value.latitude = position.coords.latitude
    coord.value.altitude = position.coords.altitude || 0
  } catch (e) { console.log(e) }

}

const geoCapable = navigator?.geolocation

const dayNow = computed(() => {
  const tut = astro.value.ut - Math.floor(transits[1].peak.ut)
  const localMidnight = new Date(astro.value.date.getFullYear(), astro.value.date.getMonth(), astro.value.date.getDate());
  const elapsedMs = astro.value.date - localMidnight;
  const day = Math.floor(tut).toString(8).padStart(6, '0')
  const time = (elapsedMs / 1000 / 60 / 60 / 24).toString(8).slice(2).padEnd(7, '0')
  return { astro, tut, day, time }
})

</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.p-4.gap-2.flex.flex-col.overflow-y-scroll.text-sm.max-w-55ch.mx-auto.my-2px
  blockquote.bg-orange-100.p-2.text-xl.font-italic What time is it now? 

  .text-lg {{dayNow.day}}.{{dayNow.time.slice(0,6)}}
  
  p Your computer thinks it is <code>{{+now}}</code> milliseconds since midnight <code>{{new Date(0).toLocaleDateString()}}</code>, Gregorian calendar will show <code>{{now.toLocaleDateString()}}</code> and the digital clock would display <code>{{now.toLocaleTimeString()}}</code>. It is the <code>{{astro.ut.toFixed(5)}}</code> Julian Day now from astronomical Epoch tables from noon <code>{{jd0Astro.date.toLocaleDateString()}}</code> along the prime meridian. This is all a big mess of counting bases, historical quirks and dead empires remnants.

  h2.text-lg.font-bold Venus clock

  p The most impressive demonstration of 5:8:13 Earth-Venus orbital resonance is once in a century Venus transit pairs, first scientifically recorded on <b>{{historicalTransits[0].peak.date.toLocaleDateString()}}</b> and <b>{{historicalTransits[1].peak.date.toLocaleDateString()}}</b> opening the First  <b>{{((transits[0].peak.ut - historicalTransits[0].peak.ut)/yearLength).toFixed(2)}}</b> years Octaeteris Era that had just transitioned to the Second Era when atomic clocks and digital cameras first recorded the pair on <b>{{transits[0].peak.date.toLocaleDateString()}}</b> and <b>{{transits[1].peak.date.toLocaleDateString()}}</b> with exactly <b>{{(transits[1].peak.ut-transits[0].peak.ut).toFixed(2)}}</b> days in-between. It's the Venus Octaeteris - the <b>5</b> Venus synodic cycles of <b>{{((transits[1].peak.ut-transits[0].peak.ut)/5).toFixed(4)}}</b> days each happening in <b>8</b> Solar years. Due to the inclination of the Venus orbit the full alignment of Earth, Venus and Sun in a transit happens quite rarely - next pair will occur <b>{{((transits[2].peak.ut - transits[1].peak.ut)/yearLength).toFixed(2)}}</b> years later on <b>{{transits[2].peak.date.toLocaleDateString()}}</b> and <b>{{transits[3].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[3].peak.ut-transits[2].peak.ut).toFixed(2)}}</b> days between them. We would have to wait another span of  <b>{{((transits[4].peak.ut - transits[3].peak.ut)/yearLength).toFixed(2)}}</b> years to see the closing pair that terminates the full Venus transit cycle on  <b>{{transits[4].peak.date.toLocaleDateString()}}</b> and restarts it again with the new cycle of <b>{{(transits[5].peak.ut-transits[4].peak.ut).toFixed(2)}}</b> days with  <b>{{transits[5].peak.date.toLocaleDateString()}}</b> pair transit. The full transit cycle takes <b>{{((transits[4].peak.ut - transits[0].peak.ut)/yearLength).toFixed(2)}}</b> years or <b>{{((transits[4].peak.ut - transits[0].peak.ut)).toFixed(2)}}</b> days, which is exactly <b>{{((transits[4].peak.ut - transits[0].peak.ut)/2920).toFixed(1)}}</b> octaeterides or <b>{{((transits[4].peak.ut - transits[0].peak.ut)/((transits[1].peak.ut-transits[0].peak.ut)/5)).toFixed(0)}}</b> Venus cycles.
  
  p It's worth noticing that the time between transits in a pair is just <b>{{(yearLength*8-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(4)}}</b> days less than exactly <b>8</b> solar years of <b>{{yearLength.toFixed(4)}} days</b> - the Solar Octaeteris of <b>{{(yearLength*8).toFixed(4)}}</b> days. This is also quite close to <b>99</b> Moon cycles of <b>{{moonCycle.toFixed(4)}}</b> days - <b>{{(moonCycle*99).toFixed(4)}}</b>. Three most noticeable objects in the sky are resonating around the same period of <b>2920</b> days. So 5 Venus cycles are just <b>{{(2920-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(2)}}</b> days shorter than 2920, Sun reaches the same position in the sky <b>{{((yearLength*8)-2920).toFixed(2)}}</b> days later, Moon catches up in <b>{{((moonCycle*99)-2920).toFixed(2)}}</b> days. This means that we can use the period of 2920 days as the core solar system grounding vehicle.


  p So we have counter <b>{{(astro.ut -transits[1].peak.ut).toFixed(2)}}</b> days past the 2012 Transit - this our core number! It is the progress line of the  <b>{{((transits[4].peak.ut - transits[0].peak.ut)).toFixed(2)}}</b> days of current Second Era - we're  <b>{{((astro.ut -transits[1].peak.ut)/(transits[4].peak.ut - transits[0].peak.ut)).toFixed(2)}}%</b> into it. And now we can start making lenses to this number.

  p Here are the numbers the planets give us: <b>2920 = 365x8 = 584x5 = 73x40 = (1+8+64)x(5x8)</b> - this is the core equation of the whole Octaeteris subdivision system, just look at these same numbers in octal: <code class="octal">5550</code> = <code class="octal">555x10</code> = <code class="octal">1110x5</code> = <code class="octal">111x50</code> = <code class="octal">(1+10+100)x(5x10)</code>.

  .text-lg So the octal time now is day <code class="octal">{{(dayNow.day)}}.{{dayNow.time.slice(0,6)}}</code>/<code class="octal">{{((transits[4].peak.ut - transits[0].peak.ut)).toString(8).slice(0,11)}}</code> of the Second Transit Era.


</template>


<style scoped>
code,
input.code {
  @apply bg-gray-200 px-1 py-1px rounded-lg text-sm
}

code.octal {
  @apply bg-orange-200 font-bold
}
</style>