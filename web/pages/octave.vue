<script setup>
import { transits, octaeteride, year, currentStart, dayCount, octaveCount, seasonCount } from '../../src/astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors, arrows } from '../../src/useDay.js';


</script>

<template lang="pug">
section.p-8.bg-green-100
  .flex.gap-1
    .font-bold {{Math.floor(octaDays/2920)}} 
    i octaeteris and
  .flex.gap-1
    .font-bold 0o{{Math.floor(octaDays-Math.floor(octaDays/2920)*2920).toString(8)}} 
    i days
  h4 {{((Math.floor(dayFraction*4096)).toString(8)).split('').flatMap((_, i, arr) =>   i % 2 === 0 ? [arr[i] + arr[i + 1]] : []).join(':')}} of this day

  p Years passed: {{octaeteride}} octaeteris and {{year}} years
  p Start: {{currentStart}}
  p Today: {{now.toUTCString()}}
  p Total days: 0o{{dayCount.toString(8)}}/0o{{(2920).toString(8)}}
  p Octave:  {{dayCount%8}}th day of 0o{{octaveCount.toString(8)}}/0o{{(2920/8).toString(8)}} octave
  p Seasons: 0o{{(dayCount-seasonCount*73).toString(8)}} day of  0o{{seasonCount.toString(8)}}/0o{{(40).toString(8)}} season that started on day 0o{{(seasonCount*73).toString(8)}}
</template>