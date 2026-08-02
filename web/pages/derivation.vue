<script setup>

import { recentSolstice, octaeteride, year, currentStart, dayCount, octaveCount, seasonCount, transits, jd0Astro, yearLength, startMoon, nextMoon, moonCycle, startSolstice, CALENDAR_EPOCH, yearsPassed } from '../../src/astro.js';
import { now, astro, octaDays, octime, dayFraction, octalDayFraction as odf } from '../../src/useDay.js';
import { computed } from 'vue'

function octal(n, s) {
  const oct = n.toString(8)
  if (s) { return oct.slice(0, s) } else { return oct }
}

</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.p-4.gap-2.flex.flex-col.overflow-y-scroll.text-sm.max-w-55ch.mx-auto.my-2px
  blockquote.bg-orange-100.p-2.text-xl.font-italic What time is it now? 
  
  p Your computer thinks it is <code>{{+now}}</code> microseconds since <code>{{new Date(0).toLocaleDateString()}}</code>, Gregorian calendar will show <code>{{now.toLocaleDateString()}}</code> and the atomic clock would display <code>{{now.toLocaleTimeString()}}</code>, but what if we would use the Solar system as the time keeping device? We would study cycles.

  p The astronomical epoch for modern ephemeris starts on noon <code>{{jd0Astro.date.toLocaleDateString()}}</code> along the prime meridian. Astronomers just count continuous Julian Days since then - it is the <code>{{astro.ut.toFixed(5)}}</code> day now. This is a very useful number to calculate durations and periodicity, but it is defined at another location and the boundary is not how we think of days - the day changes at local midnight in most real world cultures. For the midnight we can just add <code>0.5</code> day to the JD, but to get the local offset we need to know where you are now on the planet. Your computer provides the timezone information, so we can estimate your location from the offset minutes we get from the browser - <code>{{(new Date()).getTimezoneOffset()}}</code> min, that is <code>{{(new Date()).getTimezoneOffset()/60}}</code> hours - this makes us guess your longitude as <code>{{(new Date()).getTimezoneOffset()/4}}&deg;</code>.


  .text-lg So we can say that now it's the  octant <b>{{odf[0]}}</b>,  session <b>{{odf[1]}}</b>,  topic <b>{{odf[2]}}</b>, turn <b>{{odf[3]}}</b>, phrase  <b>{{odf[4]}}</b> and  beat <b>{{odf[5]}}</b>.


  p First let's find the first pair of Venus transits in this new epoch: they happened on <b>{{transits[0].peak.date.toLocaleDateString()}}</b> and <b>{{transits[1].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[1].peak.ut-transits[0].peak.ut).toFixed(2)}}</b> days passed between. It's the Venus Octaeteris - the <b>5</b> Venus synodic cycles of <b>{{((transits[1].peak.ut-transits[0].peak.ut)/5).toFixed(4)}}</b> days each. This is the famous 5:8:13 resonance of Earth and Venus. Due to the inclination of the Venus orbit the full alignment of Earth, Venus and Sun in a transit happens quite rarely - next pair will occur in <b>{{((transits[2].peak.ut - transits[1].peak.ut)/yearLength).toFixed(2)}}</b> years on <b>{{transits[2].peak.date.toLocaleDateString()}}</b> and <b>{{transits[3].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[3].peak.ut-transits[2].peak.ut).toFixed(2)}}</b> days between them. We would have to wait another span of  <b>{{((transits[4].peak.ut - transits[3].peak.ut)/yearLength).toFixed(2)}}</b> years to see the closing pair that terminates the full Venus transit cycle on  <b>{{transits[4].peak.date.toLocaleDateString()}}</b> and restarts it again with the new cycle of <b>{{(transits[5].peak.ut-transits[4].peak.ut).toFixed(2)}}</b> days with  <b>{{transits[5].peak.date.toLocaleDateString()}}</b> pair transit. The full transit cycle takes <b>{{((transits[4].peak.ut - transits[0].peak.ut)/yearLength).toFixed(2)}}</b> years or <b>{{((transits[4].peak.ut - transits[0].peak.ut)).toFixed(2)}}</b> days, which is exactly <b>{{((transits[4].peak.ut - transits[0].peak.ut)/2920).toFixed(1)}}</b> octaeterides or <b>{{((transits[4].peak.ut - transits[0].peak.ut)/((transits[1].peak.ut-transits[0].peak.ut)/5)).toFixed(0)}}</b> Venus cycles.
  
  p It's worth to notice, that the time between transits in a pair is just <b>{{(yearLength*8-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(4)}}</b> days less than exactly <b>8</b> solar years of <b>{{yearLength.toFixed(4)}} days</b> - the Solar Octaeteris of <b>{{(yearLength*8).toFixed(4)}}</b> days. This is also quite close to <b>99</b> Moon cycles of <b>{{moonCycle.toFixed(4)}}</b> days - <b>{{(moonCycle*99).toFixed(4)}}</b>. Three most noticeable objects in the sky are resonating around the same period of <b>2920</b> days. So 5 Venus cycles are just <b>{{(2920-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(2)}}</b> days shorter than 2920, Sun reaches the same position in the sky <b>{{((yearLength*8)-2920).toFixed(2)}}</b> days later, Moon catches up in <b>{{((moonCycle*99)-2920).toFixed(2)}}</b> days. This means that we can use the period of 2920 days as the core solar system grounding vehicle.

  p <b>2920 = 365x8 = 584x5 = 73x40 = (1+8+64)x(5x8)</b> - this is the core equation of the whole Octaeteris subdivision system. 

  p The most important of the 3 cycles - Solar, Venus and Lunar - Solar is the most important for daily life. It's defining weather seasons because of the inclination of Earth rotation axis and elliptic shape of the orbit. So we can define the main Octaeteris as exact 8 Solar years count - <b>{{(yearLength*8).toFixed(4)}}</b> days. It means that we can count <b>2920</b> uninterrupted days, then wait a couple of days and reset the day counter while incrementing the Octaeteris counter by one. But what event defines the solar year and will give us the observational reference for the solar cycle? Of course it's the <b>Summer Solstice</b> - the point of maximum declination of the Sun. So if we start the count on the day of the solstice, then we would count up until we almost reach the solstice 8 years past, wait till the exact moment of solar standstill to reset the day counter and incement the bigger cycle counter. 

  p The 2004 transit happened on <b>{{transits[0].peak.date.toLocaleDateString()}}</b>, just <b>{{(startSolstice.ut-transits[0].peak.ut).toFixed(2)}}</b> days before the Summer Solstice on <b>{{startSolstice.date.toLocaleDateString()}}</b>. This distance would shrink with each <b>243</b> years cycle by a couple of days so the in centuries the transits would reach the solstice time - like the <b>22/06/3462</b> and <b>19/06/3470</b> future transits. Anyway this defines our starting day of the modern Octaeteris calendar - the Summer Solstice of <b>{{startSolstice.date.toLocaleDateString()}}</b>.

  p We could define the exact moment as the starting point, but we must include one implicit cycle to the equation - the Earth rotation. This means that we can define the initial moment of the Octaeteris as follows: <b>The Local Epoch is the exact Universal Time (UT) of the local solar midnight immediately preceding (or coinciding with) the exact astronomical moment of the first Solstice following a Venus Transit</b>. So the we start the counter on local midnight on <b>{{CALENDAR_EPOCH.date.toLocaleDateString()}}</b>. This means that the local timezone offset is built in the local time so that we can just count days and always stay in sync. 

  p Since then we have <b>{{octaDays.toFixed(2)}}</b> days past - that is more than <b>2920</b>, so we need to count the finished Octaeterides and find the exact number of the day in the current cycle. First let's find the last Summer Solstice - <b>{{recentSolstice.date.toLocaleDateString()}}</b>. Then just subtract the Epoch and we get <b>{{yearsPassed}}</b> complete solar years passed between them - <b>{{octaeteride}}x8 + {{year}}</b> years have passed. Current octaeteris started on <b>{{currentStart.date.toLocaleDateString()}}</b> Summer Solstice local midnight.

  p It's <b>{{octaeteride}}</b> octaeterides and <b>{{dayCount}}</b>/2920 days since the Epoch. Today it's the day <b>{{(dayCount-seasonCount*73)}}</b>/73 of pentad <b>{{(seasonCount)}}</b>/40. Thus, we can display current date as <b>{{octaeteride}}-{{dayCount}}</b> or <b>{{octaeteride}}-{{(seasonCount)}}-{{(dayCount-seasonCount*73)}}</b> in decimal. The pentad number can tell us the solar year and the Venus cycle phase - 5 pentads make 1 Solar year, 8 pentads close the Venus cycle. So we've now covered {{(seasonCount)}}/5=<b>{{(seasonCount/5).toFixed(2)}} of 8</b> years of current Octaeteris, which also means we're in {{(seasonCount)}}/8=<b>{{(seasonCount/8).toFixed(2)}} of 5</b> Venus cycles in the same period. 
  
  p We have the day address, but what time is it? This is not hard to find. We just need to find our local day fraction - which part of the distance between our past and future local midnights we've already covered - it's <b>{{(dayFraction).toFixed(4)}}</b> or <b>{{(dayFraction*100).toFixed(2)}}%</b> of this day now.

  .text-lg So the time now is <b>{{octaeteride}}-{{seasonCount}}-{{(dayCount-seasonCount*73+dayFraction).toFixed(4)}}</b> in decimal.

  p Now let's think if decimal is the best choice here. We have 8 years in Octaeteris, 5 Venus cycles in each, which include 8 pentads of 73 days. And 73=1+8+64 - it is the octal "angel number" 0o111 - and we have 40 of these in full octaeteris cycle. Base-8 fits the system much better and preserves more valuable insights than decimal. Let's convert the date to octal.

  .text-lg So the time now is <b>{{octaeteride.toString(8)}}-{{(dayCount+dayFraction).toString(8).slice(0,10)}}</b> as pure day count of the octaeteris or <b>{{octaeteride.toString(8)}}-{{seasonCount.toString(8)}}-{{(dayCount-seasonCount*73+dayFraction).toString(8).slice(0,8)}}</b> with pentad seasons in octal.

  p We naturally have 8-day octave "weeks" and the last digit of the pure day count show it instantly (starting with 0 and ending after 7) - today is the day <b>{{dayCount%8}}</b>. The pentad-based date seems to obscure the weekday, but it's quite easy to recover: each pentad shifts the weekdays by 1 (73=8*9+1), so to find the weekday from the pentad format we just need to sum the last two digits of the pentad and the day and see what is the last digit of the result: <b>0o{{seasonCount.toString(8)}}</b> pentad and <b>0o{{(dayCount-seasonCount*73).toString(8)}}</b> day give us <b>0o{{seasonCount.toString(8).slice(-1)}}</b>+<b>0o{{(dayCount-seasonCount*73).toString(8).slice(-1)}}</b> = <b>0o{{(Number(seasonCount.toString(8).slice(-1)) + Number((dayCount-seasonCount*73).toString(8).slice(-1))).toString(8)}}</b> in octal, look at the last digit - it's <b>{{((Number(seasonCount.toString(8).slice(-1))+ Number((dayCount-seasonCount*73).toString(8).slice(-1)))%8)}}</b> day of current octave week. The weeks run continuously for the whole octaeteris, and reset at the 8th Solstice. 

  p So, in octal, we can say that this is Octaeteris <b>{{octal(octaeteride)}}</b>, year <b>{{octal(year)}}</b>, pentad <b>{{octal(seasonCount)}}</b>, day <b>{{octal(dayCount-seasonCount*73)}}</b>. It's day <b>{{dayCount%8}}</b> of the octave <b>{{octal(Math.floor(dayCount/8))}}</b>.



</template>


<style scoped>
code {
  @apply bg-orange-200 px-1 py-1px rounded-lg
}
</style>