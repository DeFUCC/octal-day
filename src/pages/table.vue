<script setup>
import { useNow } from '@vueuse/core'
import { computed, onMounted, nextTick } from 'vue'
import { octalDay, EPOCH_1 } from '../../README.md'
import { planets } from '../useDay.js'
import { octalDate } from '../../README.md'
import { Elongation, Body, Seasons, MoonPhase, Illumination } from 'astronomy-engine'

const now = useNow()
const full = computed(() => octalDay(now.value.getTime()))
const date = computed(() => full.value.split(' ')[0])
const day = computed(() => date.value.split('-')[2])
const petal = computed(() => Math.floor(Number(`0o${day.value}`) / 73))
const firstDay = computed(() => (petal.value * 73))
const lastDay = computed(() => ((petal.value + 1) * 73))
const days = computed(() => {
  const initialDay = Number(`0o${firstDay.value.toString(8).padStart(4, '0').slice(0, 3)}0`)
  const ds = Array(80).fill(1).map((_, i) => {
    const dec = initialDay + i
    const oct = dec.toString(8).padStart(4, '0')
    const octal = `${date.value.split('-')[0]}-${date.value.split('-')[1]}-${oct} 00:00:00`
    const timestamp = new Date(octalDate(octal, 0))
    const venus = Elongation(Body.Venus, timestamp)
    const moon = { angle: MoonPhase(timestamp), phase: Illumination(Body.Moon, timestamp).phase_fraction }
    return { dec, oct, octal, timestamp, venus, moon }
  })
  return ds
})

</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.gap-2.flex.flex-col.items-center.overflow-y-scroll.my-2px.w-full 
  p Petal {{petal.toString(8)}}, Day {{day}}
  .grid.w-full.octave-grid.gap-1.h-full.p-2
    .flex.p-1.bg-orange-100.sticky.top-0.z-20(v-for="(p,pp) in planets") 
      span {{pp}}
      .flex-1
      span {{ p.slice(0,2)}}
    .flex.flex-col.p-1.bg-orange-100.z-10.border-2.rounded-lg(v-for="(d,dd) in days" :style="{opacity:d.dec<firstDay||d.dec>lastDay?0.3:1, borderColor:d.oct==day?'red':'none'}") 
      span {{d}}
      .flex.gap-2.items-center
        .flex-1
        .text-xs.op-50 {{d.venus.elongation.toFixed(2)}}
        .rounded-full.w-3.h-3.shadow-lg(:style="{backgroundColor: d.venus.visibility =='morning' ? 'yellow': 'lightblue'}")

</template>


<style scoped>
.octave-grid {
  grid-template-columns: repeat(8, 1fr);
}
</style>