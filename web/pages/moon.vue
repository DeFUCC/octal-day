<script setup>
import { transits, getMoonPhase } from '../../src/astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors, moon } from '../../src/useDay.js';

import MoonPhase from '../MoonPhase.vue'
</script>

<template lang="pug">
section.p-8.bg-dark-700.text-light.flex.flex-col.gap-2.items-center
  MoonPhase(:phase="moon.angle/360")
  .text-lg Angle: {{moon.angle.toFixed(2)}}°
  .text-sm Age: {{moon.age.toFixed(2)}} days
</template>