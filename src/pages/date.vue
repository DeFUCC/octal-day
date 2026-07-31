<script setup>
import { transits, getOfflineSolarFraction, formatWithTemporal } from '../astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors } from '../useDay.js';
</script>

<template lang="pug">
section.p-8.bg-blue-100
  h2 {{formatWithTemporal(now.toISOString())}}

</template>