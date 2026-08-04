<script setup>

import { currentStart, getMoonPhase } from '../../src/astro.js';
import { planets, moonPhases, colors } from '../../src/useDay.js';
import { computed, onMounted, nextTick, ref } from 'vue'

import { Elongation, Body, Seasons } from 'astronomy-engine'

const yearOffset = ref(0)
const today = ref(null)

const visibleYear = computed(() => {
  const baseYear = new Date().getUTCFullYear() + yearOffset.value
  const start = Seasons(baseYear).jun_solstice
  const end = Seasons(baseYear + 1).jun_solstice
  const totalDays = Math.max(1, Math.round(end.ut - start.ut))
  const days = Array.from({ length: totalDays }, (_, index) => {
    const astroDay = start.AddDays(index)
    return {
      key: `${baseYear}-${index}`,
      astroDay,
      date: astroDay.date,
      dayIndex: index,
      isToday: astroDay.date.toDateString() === new Date().toDateString(),
    }
  })

  const rows = []
  for (let i = 0; i < days.length; i += 8) {
    rows.push(days.slice(i, i + 8))
  }

  return {
    baseYear,
    start,
    end,
    days,
    rows,
  }
})

const visibleYearLabel = computed(() => `${visibleYear.value.start.date.getUTCFullYear()}–${visibleYear.value.end.date.getUTCFullYear()}`)

function jumpToCurrentYear() {
  yearOffset.value = 0
}

onMounted(() => {
  nextTick(() => {
    today.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
})

</script>

<template lang="pug">
section.border-1.bg-orange-50.shadow-xl.flex-auto.gap-2.flex.flex-col.items-center.overflow-y-scroll.my-2px.w-full
  .flex.items-center.justify-between.w-full.px-2.py-1
    button.px-2.py-1.bg-gray-200.rounded-lg.shadow(@click="yearOffset--") ←
    .text-center
      .text-sm.font-bold {{ visibleYearLabel }}
      .text-xs.op-60 Solstice-to-solstice view
    .flex.items-center.gap-2
      button.px-2.py-1.bg-gray-200.rounded-lg.shadow(@click="jumpToCurrentYear()") Now
      button.px-2.py-1.bg-gray-200.rounded-lg.shadow(@click="yearOffset++") →

  .grid.w-full.octave-grid.gap-1
    .w-8 #
    .flex.p-1.bg-orange-100.sticky.top-0.z-20(v-for="(p,pp) in planets")
      span {{pp}}
      .flex-1
      span {{ p.slice(0,2)}}

    template(v-for="(row, rowIndex) in visibleYear.rows")
      .p-1.bg-orange-100.sticky.left-0.z-20 {{rowIndex.toString(8)}}
      .p-1.flex.flex-col.rounded.border-1px.shadow-lg.hover-op-100.op-80.transition(v-for="day in row" :key="day.key" :style="{backgroundColor: day.isToday ? 'orange' : '#fff3', borderColor: colors[Math.floor(day.dayIndex/73)%8]}" :id="day.isToday ? 'today' : ''" :ref="day.isToday ? today : null")
        .text-xs.op-30.font-mono {{day.date.toLocaleDateString()}}
        .font-mono.text-xs.op-60 D{{day.dayIndex.toString(8)}}
        .font-normal s{{Math.floor(day.dayIndex/73).toString(8)}}-d{{(day.dayIndex-Math.floor(day.dayIndex/73)*73).toString(8)}}
        .text-xs Y{{Math.floor(Math.floor(day.dayIndex/73)/5).toString(8)}} V{{Math.floor(Math.floor(day.dayIndex/73)/8).toString(8)}}{{Elongation(Body.Venus, day.date).visibility.slice(0,1).toUpperCase()}}
        .flex.gap-2.items-center
          .text-xs.op-50(:title="getMoonPhase(day.date).age") {{moonPhases[Math.round(getMoonPhase(day.date).angle/360*8)%8]}}
          .flex-1
          .rounded-full.bg-red.w-3.h-3.shadow-lg(:style="{backgroundColor: Elongation(Body.Venus, day.date).visibility =='morning' ? 'yellow': 'lightblue'}" :title="Elongation(Body.Venus, day.date).visibility")

</template>


<style scoped>
.octave-grid {
  grid-template-columns: minmax(2.5rem, 4rem) repeat(8, 1fr);
}

.octave-grid {
  grid-template-columns: minmax(2.5rem, 4rem) repeat(8, minmax(0, 1fr));
}
</style>