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

  .text-lg So we can say that now it's the  octant <b>{{odf[0]}}</b>,  session <b>{{odf[1]}}</b>,  topic <b>{{odf[2]}}</b>, turn <b>{{odf[3]}}</b>, phrase  <b>{{odf[4]}}</b> and  beat <b>{{odf[5]}}</b>.

  h2.text-lg.font-bold Venus

  p It's not only the 3D space or 2<sup>3</sup> grouping, that is guiding our octal time. It's 8 planets in the Solar system, it's also the Octaeteris - the periodic 5:8:13 Earth-Venus orbital resonance every 8 years along with 99 moon cycles. It is our clock!

  p The most significant demonstration of this resonance is once in a century Venus transit pairs, first recorded on <b>{{historicalTransits[0].peak.date.toLocaleDateString()}}</b> and <b>{{historicalTransits[1].peak.date.toLocaleDateString()}}</b> opening the First  <b>{{((transits[0].peak.ut - historicalTransits[0].peak.ut)/yearLength).toFixed(2)}}</b> years Octaeteris Era that had just transitioned to the Second Era on <b>{{transits[0].peak.date.toLocaleDateString()}}</b> and <b>{{transits[1].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[1].peak.ut-transits[0].peak.ut).toFixed(2)}}</b> days passed between. It's the Venus Octaeteris - the <b>5</b> Venus synodic cycles of <b>{{((transits[1].peak.ut-transits[0].peak.ut)/5).toFixed(4)}}</b> days each happening in <b>8</b> Solar years. Due to the inclination of the Venus orbit the full alignment of Earth, Venus and Sun in a transit happens quite rarely - next pair will occur in <b>{{((transits[2].peak.ut - transits[1].peak.ut)/yearLength).toFixed(2)}}</b> years on <b>{{transits[2].peak.date.toLocaleDateString()}}</b> and <b>{{transits[3].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[3].peak.ut-transits[2].peak.ut).toFixed(2)}}</b> days between them. We would have to wait another span of  <b>{{((transits[4].peak.ut - transits[3].peak.ut)/yearLength).toFixed(2)}}</b> years to see the closing pair that terminates the full Venus transit cycle on  <b>{{transits[4].peak.date.toLocaleDateString()}}</b> and restarts it again with the new cycle of <b>{{(transits[5].peak.ut-transits[4].peak.ut).toFixed(2)}}</b> days with  <b>{{transits[5].peak.date.toLocaleDateString()}}</b> pair transit. The full transit cycle takes <b>{{((transits[4].peak.ut - transits[0].peak.ut)/yearLength).toFixed(2)}}</b> years or <b>{{((transits[4].peak.ut - transits[0].peak.ut)).toFixed(2)}}</b> days, which is exactly <b>{{((transits[4].peak.ut - transits[0].peak.ut)/2920).toFixed(1)}}</b> octaeterides or <b>{{((transits[4].peak.ut - transits[0].peak.ut)/((transits[1].peak.ut-transits[0].peak.ut)/5)).toFixed(0)}}</b> Venus cycles.
  
  p It's worth noticing that the time between transits in a pair is just <b>{{(yearLength*8-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(4)}}</b> days less than exactly <b>8</b> solar years of <b>{{yearLength.toFixed(4)}} days</b> - the Solar Octaeteris of <b>{{(yearLength*8).toFixed(4)}}</b> days. This is also quite close to <b>99</b> Moon cycles of <b>{{moonCycle.toFixed(4)}}</b> days - <b>{{(moonCycle*99).toFixed(4)}}</b>. Three most noticeable objects in the sky are resonating around the same period of <b>2920</b> days. So 5 Venus cycles are just <b>{{(2920-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(2)}}</b> days shorter than 2920, Sun reaches the same position in the sky <b>{{((yearLength*8)-2920).toFixed(2)}}</b> days later, Moon catches up in <b>{{((moonCycle*99)-2920).toFixed(2)}}</b> days. This means that we can use the period of 2920 days as the core solar system grounding vehicle.

  p <b>2920 = 365x8 = 584x5 = 73x40 = (1+8+64)x(5x8)</b> - this is the core equation of the whole Octaeteris subdivision system. 

  p The most important of the 3 cycles - Solar, Venus and Lunar - Solar is the most important for daily life. It's defining weather seasons because of the inclination of Earth rotation axis and elliptic shape of the orbit. The practical calendar rule is therefore to anchor each Octaeteris to the observed summer solstice and count the elapsed days from the local-epoch boundary of that solstice. The <b>8</b>-year span is the governing resonance, while the <b>2920</b>-day number is the rounded, humanly useful reference period for the calendar subdivisions. We do not claim that every boundary is exactly equal to the physical resonance; we use the solstice boundary as the observable anchor and the 2920-day value as the calendar's stable counting reference. 

  p The 2004 transit happened on <b>{{transits[0].peak.date.toLocaleDateString()}}</b>, just <b>{{(startSolstice.ut-transits[0].peak.ut).toFixed(2)}}</b> days before the Summer Solstice on <b>{{startSolstice.date.toLocaleDateString()}}</b>. This distance would shrink with each <b>243</b> years cycle by a couple of days so the in centuries the transits would reach the solstice time - like the <b>22/06/3462</b> and <b>19/06/3470</b> future transits. Anyway this defines our starting day of the modern Octaeteris calendar - the Summer Solstice of <b>{{startSolstice.date.toLocaleDateString()}}</b>.

  p Since then we have <b>{{octaDays.toFixed(2)}}</b> days past - that is more than <b>2920</b>, so we need to count the finished Octaeterides and find the exact number of the day in the current cycle. First let's find the last Summer Solstice - <b>{{recentSolstice.date.toLocaleDateString()}}</b>. Then just subtract the Epoch and we get <b>{{yearsPassed}}</b> complete solar years passed between them - <b>{{octaeteride}}x8 + {{year}}</b> years have passed. Current octaeteris started on <b>{{currentStart.date.toLocaleDateString()}}</b> Summer Solstice local midnight.

  p It is <b>{{octaeteride}}</b> octaeterides and <b>{{dayCount}}</b>/2920 days since the current solstice boundary. Today it's the day <b>{{(dayCount-seasonCount*73)}}</b>/73 of pentad <b>{{(seasonCount)}}</b>/40. Thus, we can display the current date as <b>{{octaeteride}}-{{dayCount}}</b> or <b>{{octaeteride}}-{{(seasonCount)}}-{{(dayCount-seasonCount*73)}}</b> in decimal. The pentad number is a convenient subdivision of the current Octaeteris; it is not meant to replace the astronomical boundary itself, but to make the cycle legible in a human-scaled form. 

  p We have Octaeteris of Solar 8 years  each slightly longer of 5 pentads of 73 days resonating with 5 Venus cycles each of 8 pentads long. Octal is revealing: 73=1+8+64 - it is the octal "angel number" 0o111 - and we have 40 of these in full octaeteris cycle. Base-8 fits the system reveals valuable insights. Let's convert the date to octal.

  .text-lg So the time now is in Era <code class="octal">{{era.toString(8)}}</code>, Octaeteris <code class="octal">{{octaeteris.toString(8)}}</code> with pure day count <code class="octal">{{octaeteride.toString(8)}}-{{(dayCount+dayFraction).toString(8).slice(0,9)}}</code> or <b>{{octaeteride.toString(8)}}-{{seasonCount.toString(8)}}-{{(dayCount-seasonCount*73+dayFraction).toString(8).slice(0,7)}}</b> with pentad seasons in octal.

  p We naturally have 8-day octaves and the last digit of the pure day count show it instantly (starting with 0 and ending after 7) - today is the day <b>{{dayCount%8}}</b>. The pentad-based date seems to obscure the weekday, but it's quite easy to recover: each pentad shifts the weekdays by 1 (73=8*9+1), so to find the weekday from the pentad format we just need to sum the last two digits of the pentad and the day and see what is the last digit of the result: <b>0o{{seasonCount.toString(8)}}</b> pentad and <code class="octal">{{(dayCount-seasonCount*73).toString(8)}}</code> day give us <code class="octal">{{seasonCount.toString(8).slice(-1)}}</code>+<code class="octal">{{(dayCount-seasonCount*73).toString(8).slice(-1)}}</code> = <code class="octal">{{(Number(seasonCount.toString(8).slice(-1)) + Number((dayCount-seasonCount*73).toString(8).slice(-1))).toString(8)}}</code> in octal, look at the last digit - it's day <b>{{((Number(seasonCount.toString(8).slice(-1))+ Number((dayCount-seasonCount*73).toString(8).slice(-1)))%8)}}</b>  of current octave. The octaves run continuously for the whole octaeteris, and reset at the 8th Solstice. 

  p So, in octal, we can say that this is Era <code class="octal">{{octal(era).padStart(2,'0')}}</code> Octaeteris <code class="octal">{{octal(octaeteris).padStart(2,'0')}}</code>, pentad <code class="octal">{{octal(seasonCount).padStart(2,'0')}}</code>, day <code class="octal">{{octal(dayCount-seasonCount*73).padStart(2,'0')}}</code>. It's day <code class="octal">{{dayCount%8}}</code> of the octave <code class="octal">{{octal(Math.floor(dayCount/8))}}</code>.

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