<script setup>

import { recentSolstice, octaeteride, year, currentStart, dayCount, octaveCount, seasonCount, transits, jd0Astro, yearLength, startMoon, nextMoon, moonCycle, startSolstice, CALENDAR_EPOCH, yearsPassed } from '../../src/astro.js';
import { now, astro, octaDays } from '../../src/useDay.js';
import { computed } from 'vue'



</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.p-4.gap-2.flex.flex-col.overflow-y-scroll.text-sm
  p What time is it? Let's find it using the Solar system as the clock!
  p The astronomical epoch for modern ephemeris starts on <b>{{jd0Astro.date.toLocaleDateString()}}</b>. Today is the <b>{{astro.ut.toFixed(0)}}</b><sup>th</sup> day past it. 
  p First let's find the first pair of Venus transits in this new epoch: they happened on <b>{{transits[0].peak.date.toLocaleDateString()}}</b> and <b>{{transits[1].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[1].peak.ut-transits[0].peak.ut).toFixed(2)}}</b> days passed between. It's the Venus Octaeteris - the <b>5</b> Venus synodic cycles of <b>{{((transits[1].peak.ut-transits[0].peak.ut)/5).toFixed(4)}}</b> days each. This is the famous 5:8:13 resonance of Earth and Venus. Due to the inclination of the Venus orbit the full alignment of Earth, Venus and Sun in a transit happens quite rarely - next pair will occur in <b>{{((transits[2].peak.ut - transits[1].peak.ut)/yearLength).toFixed(2)}}</b> years on <b>{{transits[2].peak.date.toLocaleDateString()}}</b> and <b>{{transits[3].peak.date.toLocaleDateString()}}</b> with <b>{{(transits[3].peak.ut-transits[2].peak.ut).toFixed(2)}}</b> days between them. We would have to wait another span of  <b>{{((transits[4].peak.ut - transits[3].peak.ut)/yearLength).toFixed(2)}}</b> years to see the closing pair that terminates the full <b>{{((transits[4].peak.ut - transits[0].peak.ut)/yearLength).toFixed(2)}}</b> years ({{((transits[4].peak.ut - transits[0].peak.ut)).toFixed(2)}} days) cycle on  <b>{{transits[4].peak.date.toLocaleDateString()}}</b> and restarts it again with the new cycle of <b>{{(transits[5].peak.ut-transits[4].peak.ut).toFixed(2)}}</b> days with  <b>{{transits[5].peak.date.toLocaleDateString()}}</b> pair transit.
  
  p It's worth to notice, that it's just <b>{{(yearLength*8-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(4)}}</b> days less than exactly <b>8</b> solar years of <b>{{yearLength.toFixed(4)}} days</b> - the Solar Octaeteris of <b>{{(yearLength*8).toFixed(4)}}</b> days. This is also quite close to <b>99</b> Moon cycles of <b>{{moonCycle.toFixed(4)}}</b> days - <b>{{(moonCycle*99).toFixed(4)}}</b>. Three most noticeable objects in the sky are resonating around the same period of <b>2920</b> days. So 5 Venus cycles are just <b>{{(2920-(transits[1].peak.ut-transits[0].peak.ut)).toFixed(2)}}</b> days shorter than 2920, Sun reaches the same position in the sky <b>{{((yearLength*8)-2920).toFixed(2)}}</b> days later, Moon catches up in <b>{{((moonCycle*99)-2920).toFixed(2)}}</b> days. This means that we can use the period of 2920 days as the core solar system grounding vehicle.

  p <b>2920 = 365x8 = 584x5 = 73x40 = (1+8+64)x(5x8)</b> - this is the core equation of the whole Octaeteris subdivision system. 

  p The most important of the 3 cycles - Solar, Venus and Lunar - Solar is the most important for daily life. It's defining weather seasons because of the inclination of Earth rotation axis and elliptic shape of the orbit. So we can define the main Octaeteris as exact 8 Solar years count - <b>{{(yearLength*8).toFixed(4)}}</b> days. It means that we can count <b>2920</b> uninterrupted days, then wait a couple of days and reset the day counter while incrementing the Octaeteris counter by one. But what event defines the solar year and will give us the observational reference for the solar cycle? Of course it's the <b>Summer Solstice</b> - the point of maximum declination of the Sun. So if we start the count on the day of the solstice, then we would count up until we almost reach the solstice 8 years past, wait till the exact moment of solar standstill to reset the day counter and incement the bigger cycle counter. 

  p The 2004 transit happened on <b>{{transits[0].peak.date.toLocaleDateString()}}</b>, just <b>{{(startSolstice.ut-transits[0].peak.ut).toFixed(2)}}</b> days before the Summer Solstice on <b>{{startSolstice.date.toLocaleDateString()}}</b>. This distance would shrink with each <b>243</b> years cycle by a couple of days so the in centuries the transits would reach the solstice time - like the <b>22/06/3462</b> and <b>19/06/3470</b> future transits. Anyway this defines our starting day of the modern Octaeteris calendar - the Summer Solstice of <b>{{startSolstice.date.toLocaleDateString()}}</b>.

  p We could define the exact moment as the starting point, but we must include one implicit cycle to the equation - the Earth rotation. This means that we can define the initial moment of the Octaeteris as follows: <b>The Local Epoch is the exact Universal Time (UT) of the local solar midnight immediately preceding (or coinciding with) the exact astronomical moment of the first Solstice following a Venus Transit</b>. So the we start the counter on local midnight on <b>{{CALENDAR_EPOCH.date.toLocaleDateString()}}</b>. This means that the local timezone offset is built in the local time so that we can just count days and always stay in sync. 

  p Since then we have <b>{{octaDays.toFixed(2)}}</b> days past - that is more than <b>2920</b>, so we need to count the finished Octaeterides and find the exact number of the day in the current cycle. First let's find the last Summer Solstice - <b>{{recentSolstice.date.toLocaleDateString()}}</b>. Then just subtract the Epoch and we get <b>{{yearsPassed}}</b> complete solar years passed between them - <b>{{octaeteride}}x8 + {{year}}</b> years have passed. 

  p It's <b>{{octaeteride}}</b> octaeterides and <b>{{dayCount}}</b>/2920 days since the Epoch. It's the day <b>{{(dayCount-seasonCount*73)}}</b>/73 of season <b>{{(seasonCount)}}</b>/40.


</template>