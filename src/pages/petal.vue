<script setup>
import { useNow } from '@vueuse/core'
import { computed, onMounted, nextTick, ref } from 'vue'
import { octalDay, EPOCH_1 } from '../../README.md'
import { planets, moonPhases } from '../useDay.js'
import { octalDate } from '../../README.md'
import { Elongation, Body, Seasons, MoonPhase, Illumination, SunPosition } from 'astronomy-engine'

const now = useNow()
const full = computed(() => octalDay(now.value.getTime()))
const date = computed(() => full.value.split(' ')[0])
const day = computed(() => date.value.split('-')[2])
const petal = computed(() => Math.floor(Number(`0o${day.value}`) / 73))
const firstDay = computed(() => (petal.value * 73))
const lastDay = computed(() => ((petal.value + 1) * 73))
const initialOctave = computed(() => firstDay.value.toString(8).padStart(4, '0').slice(0, 3))
const finalOctave = computed(() => lastDay.value.toString(8).padStart(4, '0').slice(0, 3))

const days = computed(() => {
  const initialDay = Number(`0o${firstDay.value.toString(8).padStart(4, '0').slice(0, 3)}0`)
  const ds = Array(80).fill(1).map((_, i) => {
    const dec = initialDay + i
    const oct = dec.toString(8).padStart(4, '0')
    const octal = `${date.value.split('-')[0]}-${date.value.split('-')[1]}-${oct} 00:00:00`
    const timestamp = new Date(octalDate(octal, 0))
    const venus = Elongation(Body.Venus, timestamp)
    const moon = { angle: MoonPhase(timestamp), phase: Illumination(Body.Moon, timestamp).phase_fraction }
    const sun = SunPosition(timestamp)
    let name
    let octave

    if ([initialOctave.value, finalOctave.value].includes(oct.slice(0, 3))) {
      if (dec == firstDay.value) {
        name = planets[firstDay.value % 8].slice(0, 2) + ' ' + Math.floor(parseInt(date.value.split('-')[2], 8) / 73 / 8.0).toString(8)
      } else if (dec > firstDay.value || dec < lastDay.value) {
        name = planets[firstDay.value % 8].slice(0, 2) + planets[dec % 8].slice(0, 2)
      } else {

      }
    } else {

      octave = parseInt(oct.slice(0, 3), 8) - parseInt(initialOctave.value, 8) - 1
      name = planets[firstDay.value % 8].slice(0, 2) + planets[octave].slice(0, 2) + planets[dec % 8].slice(0, 2)
    }
    return { dec, oct, octal, timestamp, venus, moon, sun, name, octave }
  })
  return ds
})

</script>

<template lang="pug">
section.bg-dark-800.shadow-xl.flex-auto.gap-2.flex.flex-col.items-center.my-2px.w-full.text-light-400
  .text-lg.w-full.px-2.bg-dark-200 Era {{date.split('-')[0]}}, Transit {{date.split('-')[1]}}, Sun {{Math.floor(parseInt(date.split('-')[2],8)/73/5.0).toString(8)}}, Venus {{Math.floor(parseInt(date.split('-')[2],8)/73/8.0).toString(8)}},  Petal {{petal.toString(8)}}
  .grid.w-full.octave-grid.gap-1.p-4vw
    .flex.p-1.bg-dark-500.sticky.top-0.z-20(v-for="(p,pp) in planets") 
      span {{pp}}
      .flex-1
      span {{ p.slice(0,2)}}
    .flex.flex-wrap.items-start.gap-1.p-5px.bg-dark-200.z-10.border-2.shadow-sm.rounded-lg.hover-bg-dark-50.transition(v-for="(d,dd) in days" :style="{opacity:d.dec<firstDay||d.dec>=lastDay?0.3:1, borderColor:d.oct==day?'#eee':'transparent'}") 
      .flex-auto.w-full.flex.flex-wrap.gap-1.items-center(style="flex:8rem")
        .flex-1.text-sm {{d.oct}}
        .text-xs.font-mono {{d?.name}}
      .flex.gap-2.items-center.flex-wrap(style="flex:3rem")
        .text-xs.op-80 {{moonPhases[Math.round(d.moon.angle/360*8)%8]}}.{{Math.floor(d.moon.angle/360*64).toString(8).padEnd(2,'0')}}
      .flex.gap-2.items-center.flex-wrap(style="flex:3rem")
        .text-xs.op-80 🌞.{{Math.floor(d.sun.elon/360*512).toString(8).padEnd(3,'0')}}
      .flex.gap-2.items-center.flex-wrap(style="flex:3rem")
        .text-xs.op-80  {{d.venus.visibility =='morning' ? '🟡': '🔵'}}.{{(Math.floor((d.venus.elongation/360)*4096)).toString(8).padStart(4,'0')}}

</template>


<style scoped>
.octave-grid {
  grid-template-columns: repeat(8, 1fr);
}
</style>