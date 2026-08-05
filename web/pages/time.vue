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
</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.p-4.gap-2.flex.flex-col.overflow-y-scroll.text-sm.max-w-55ch.mx-auto.my-2px
  blockquote.bg-orange-100.p-2.text-xl.font-italic What time is it now? 
  
  p Your computer thinks it is <code>{{+now}}</code> milliseconds since midnight <code>{{new Date(0).toLocaleDateString()}}</code>, Gregorian calendar will show <code>{{now.toLocaleDateString()}}</code> and the digital clock would display <code>{{now.toLocaleTimeString()}}</code>. It is the <code>{{astro.ut.toFixed(5)}}</code> Julian Day now from astronomical Epoch tables from noon <code>{{jd0Astro.date.toLocaleDateString()}}</code> along the prime meridian. This is all a big mess of counting bases, historical quirks and dead empires remnants.
  
  p What if we would use the Solar system itself as the time keeping device? We would study cycles. First - the orbital rates for all the 8 planets. Of course starting with the Earth and its rotation.

  h2.font-bold.text-lg Earth

  p First we need to know where we are on the planet. The web browser provides the timezone information, so we can estimate the location from the offset minutes we get from it - <code>{{(new Date()).getTimezoneOffset()/60}}</code> hours, which approximates longitude at <code>{{(new Date()).getTimezoneOffset()/4}}&deg;</code>. 
    span For more precision type in your longitude 
    input.p-1.bg-gray-300.rounded-sm.display-inline.h-5.w-5ch.text-center(v-model="coord.longitude")
    span ,&nbsp;latitude 
    input.p-1.bg-gray-300.rounded-sm.display-inline.h-5.w-5ch.text-center(v-model="coord.latitude")
    span &nbsp;and altitude 
    input.p-1.bg-gray-300.rounded-sm.display-inline.h-5.w-5ch.text-center(v-model="coord.altitude")
    span &nbsp;or just use your device 
    button.display-inline.px-1.py-1px.bg-gray-200.rounded-lg.shadow-lg(v-if="geoCapable" @click="getLocation()") Location
    span  to get better estimate of local time. Now let's look at the fraction.
  
  ul.flex.flex-col.gap-2
    li <b>Decimal</b>:  <code>{{dayFraction.toFixed(6)}}</code> - this is not particularly meaningful, yet revealing the core pattern - the day fraction gives us more precision with each digit we might. Just the <code>{{dayFraction.toFixed(6)[2]}}</code> <i>'decidays'</i>,  <code>{{dayFraction.toFixed(6).slice(2,4)}}</code><i>'centidays'</i> or <code>{{dayFraction.toFixed(6).slice(2,5)}}</code> <i>'millidays'</i> are not particularly convenient for daily use. Let's look at other options. 
    li <b>Binary</b>:  <code>{{dayFraction.toString(2).slice(0,20)}}</code> - this is a choice tree. Each digit is a halving - a switch between 'earlier' and 'later' than the middle of a whole unit. This is much more meaningful - we're in half <code>{{dayFraction.toString(2).slice(2,3)}}</code>, quarter  <code>{{dayFraction.toString(2).slice(2,4)}}</code>, quaver  <code>{{dayFraction.toString(2).slice(2,5)}}</code>, etc. This might be convenient, but a bit too verbose to say. We can compress this structure preserving the halving meaning by grouping the binary digits together - we can look at quaternary, octal, hexadecimal representations and find that 8 is the correct scale as clear consequence of 3D space we inhabit not only with bodies, but also our minds that are highly specialized to process spatial data. 
    li <b>Octal</b>:  <code class="octal">{{dayFraction.toString(8).slice(0,8)}}</code> - this is the octree of time, that balances informational density and semantics. Each digit is a 1/8 recursive step - an octave group of 3 binary choices between 'early' and 'late' parts of a whole unit. This quite intuitive too - we're in octant <code class="octal">{{dayFraction.toString(8).slice(2,3)}}</code>, session  <code class="octal">{{dayFraction.toString(8).slice(3,4)}}</code>, topic  <code class="octal">{{dayFraction.toString(8).slice(4,5)}}</code>, etc. Especially if we look at pairs and be aware of 3 main scales - daytime, internal event structure, rhythm and phrasing: session  <code class="octal">{{dayFraction.toString(8).slice(2,4)}}</code>, turn  <code class="octal">{{dayFraction.toString(8).slice(4,6)}}</code>, beat  <code class="octal">{{dayFraction.toString(8).slice(6,8)}}</code> - it's  i-ching hexagrams and a melody built from intervals. 

  .text-lg So we can say that now it's the  octant <code class="octal">{{odf[0]}}</code>,  session <code class="octal">{{odf[1]}}</code>,  topic <code class="octal">{{odf[2]}}</code>, turn <code class="octal">{{odf[3]}}</code>, phrase  <code class="octal">{{odf[4]}}</code> and  beat <code class="octal">{{odf[5]}}</code>.


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