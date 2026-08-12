<script setup>
import { useNow } from '@vueuse/core'
import { computed, onMounted, nextTick, ref } from 'vue'
import { octalDay, octalDate, EPOCH_1 } from '../../README.md'
import { planets, moonPhases } from '../useDay.js'
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

    return { planet, day: day.value.slice(0, 3) + p, today: day.value.slice(0, 3) + p == day.value }
  })
  return ds
})

</script>

<template lang="pug">
section.bg-dark-800.shadow-xl.flex-auto.gap-2.items-stretch.justify-stretch.overflow-hidden.my-2px.w-full.text-light-800.p-8.grid.grid-cols-2.lg-grid-cols-4 
  .p-4.bg-dark-300.border-1.rounded-xl(v-for="(d,dd) in days" :key="d" :style="{borderColor:d.today?'#eee':'#333'}") 
    .text-lg {{d.planet}} {{d.day}} 

</template>


<style scoped>
.octave-grid {
  grid-template-columns: repeat(2, 1fr);
}
</style>