<script setup>
import { transits, getOfflineSolarFraction, formatWithTemporal } from '../../src/astro.js'
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
</template>