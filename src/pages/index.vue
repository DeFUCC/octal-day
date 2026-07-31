<script setup>
import DayLine from './line.vue'
import { transits, formatWithTemporal } from '../astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors, coord, arrows, trigrams } from '../useDay.js';

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

</script>

<template lang="pug">
section.bg-yellow-50

  .flex.flex-wrap.gap-2.justify-around.p-2
    .p-2.flex.flex-col.gap-0.items-center.flex-1.transition.rounded(:style="{backgroundColor:colors[octalDayFraction[l]]+1}" v-for="(level,l) in levels" :key="level" ) 
      .text-2xl {{trigrams[octalDayFraction[l]]}}
      .text-2xl {{arrows[octalDayFraction[l]]}}
      .text-2xl.font-bold.font-mono {{octalDayFraction[l]}}
      .op-40 {{level}}
  DayLine.m-4

  .p-4.flex.flex-wrap.gap-2
    label.flex.gap-2.items-center.flex-1
      .p-0 Lat
      input.p-2(v-model="coord.latitude" placeholder="45.0" )
    label.flex.gap-2.items-center.flex-1
      .p-0 Long
      input.p-2(v-model="coord.longitude" placeholder="45.0" )
    button.flex-full.p-2.bg-dark-200.text-white.rounded-lg(@click="getLocation()") Locate
</template>