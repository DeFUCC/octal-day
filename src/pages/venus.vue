<script setup>
import { useNow } from '@vueuse/core'
import { computed } from 'vue'

import { transits, octaeterides } from '../astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors } from '../useDay.js';

import { Temporal } from '@js-temporal/polyfill';

function formatWithTemporal(utcIsoString) {
  const zdt = Temporal.Instant.from(utcIsoString)
    .toZonedDateTimeISO(Temporal.Now.timeZoneId());
  return `${zdt.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', })}, ${zdt.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', })}`;
}

const icProgress = { before: [], after: [] }

octaeterides.forEach(ic => {
  if (ic.ut < astro.value.ut) {
    icProgress.before.push(ic)
  } else {
    icProgress.after.push(ic)
  }
})

</script>

<template lang="pug">
section.bg-yellow-50.text-sm.overflow-y-scroll
  .p-4.font-mono
    .flex.gap-2
      .font-bold {{formatWithTemporal(transits[0].peak)}}
      i First Venus Transit
    .flex.gap-2
      .font-bold {{transits[1].peak.ut-transits[0].peak.ut}} days
      i First Venus Octaeteris
    .flex.gap-2
      .font-bold {{formatWithTemporal(transits[1].peak)}}
      i Second Venus Transit

    
    .flex.flex-col
      .text-xs(v-for="(ic,i) in icProgress.before" :key="ic") Octaeteris {{`${i.toString(8)}`.padStart(3, '0')}}: {{formatWithTemporal(ic)}}

    .my-4 NOW 

    .flex.flex-col
      .text-xs(v-for="(ic,i) in icProgress.after" :key="ic") Octaeteris {{`${(i+icProgress.before.length).toString(8)}`.padStart(3, '0')}}: {{formatWithTemporal(ic)}}

    h4 T4: {{formatWithTemporal(transits[2].peak)}}
    h4 D2: {{transits[3].peak.ut-transits[2].peak.ut}} days
    h4 T5: {{formatWithTemporal(transits[3].peak)}}
    h4 T6: {{formatWithTemporal(transits[4].peak)}}
    h4 T7: {{formatWithTemporal(transits[5].peak)}}

</template>