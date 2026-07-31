<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'

import { transits, formatWithTemporal } from '../../src/astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors } from '../../src/useDay.js';
import Globe from 'globe.gl'
import { onMounted } from 'vue'
import globeImage from '../../maps/2k_sun.jpg?base64'

const globus = ref()
const info = ref()

onMounted(() => {
  new Globe(globus.value)
    .globeImageUrl(globeImage)
    .pointAltitude('size')
    .pointColor('color')
    .atmosphereColor('#f70')
    .atmosphereAltitude(0.5)
    .onGlobeClick(() => {
      info.value.showModal()
    })
})
</script>

<template lang="pug">
section
  main(ref="globus")
  dialog.bg-transparent.outline-none.w-full.flex.flex-col.items-stretch.justify-center(ref="info" @click="(event)=>event.target == info && info.close()")
    .bg-dark-200.bg-op-20.backdrop-blur-lg.p-8.rounded-lg.border-1.border-orange
      .text-2xl.font-bold Sun

</template>