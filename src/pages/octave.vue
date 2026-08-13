<script setup>
import { useNow } from '@vueuse/core'
import { computed, onMounted, nextTick, ref } from 'vue'
import { octalDay, octalDate, EPOCH_1 } from '../../README.md'
import { planets, moonPhases, colors, arrows, trigrams, } from '../useDay.js'
import { Elongation, Body, Seasons, MoonPhase, Illumination, SunPosition } from 'astronomy-engine'

const now = useNow()
const full = computed(() => octalDay(now.value.getTime()))
const date = computed(() => full.value.split(' ')[0])
const day = computed(() => date.value.split('-')[2])
const petal = computed(() => Math.floor(Number(`0o${day.value}`) / 73))
const firstDay = computed(() => (petal.value * 73).toString(8).padStart(4, '0'))
const lastDay = computed(() => ((petal.value + 1) * 73).toString(8).padStart(4, '0'))

const days = computed(() => {
  const ds = planets.map((planet, p) => {

    const dsDate = new Date(octalDate(date.value.slice(0, -4) + day.value.slice(0, 3) + p + ' ' + full.value.split(' ')[1]))

    return {
      planet,
      day: day.value.slice(0, 3) + p,
      today: day.value.slice(0, 3) + p == day.value,
      moon: (MoonPhase(dsDate) / 360).toString(8).slice(1, 4),
      venus: Elongation(Body.Venus, dsDate),
      sun: SunPosition(dsDate)
    }
  })
  return ds
})




</script>

<template lang="pug">
section.bg-dark-800.shadow-xl.flex-auto.gap-2.items-stretch.justify-stretch.overflow-hidden.my-2px.w-full.text-light-800.p-8.grid.grid-cols-2.lg-grid-cols-4 
  .flex.flex-col.gap-2.p-4.bg-dark-300.border-1.rounded-xl(v-for="(d,dd) in days" :key="d" :style="{borderColor:d.today?colors[dd]:'#333'}") 
    .flex.items-center.gap-2
      .w-2.h-2.rounded-full(:style="{backgroundColor:colors[dd]}")
      .text-lg {{d.day}} 
      .flex-1
      .text-lg {{d.planet}} 
    .text-sm  {{moonPhases[d.moon[1]]}}{{d.moon}} 
    .text-sm 🌞.{{Math.floor(d.sun.elon/360*512).toString(8).padEnd(3,'0')}}
    .text-sm  {{d.venus.visibility =='morning' ? '🟡': '🔵'}}.{{(Math.floor((d.venus.elongation/360)*4096)).toString(8).padStart(4,'0')}}
    

</template>


<style scoped>
.octave-grid {
  grid-template-columns: repeat(2, 1fr);
}
</style>