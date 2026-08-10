<script setup>
import DayLine from './line.vue'
import { transits, octaeteride, seasonCount, dayCount, dateToOctaDate } from '../../src/astro.js'
import { computed } from 'vue'
import { now, astro, octaDays, dayFraction, octalDayFraction as oct, levels, colors, coord, arrows, trigrams, octime, } from '../../src/useDay.js';



</script>

<template lang="pug">
section.bg-yellow-50.flex.flex-col.gap-2.p-2.overflow-y-scroll
  .flex.gap-2.justify-between
    .font-mono {{octaeteride.toString(8)}}-{{Math.floor(dateToOctaDate().day/73).toString(8)}}-{{(dateToOctaDate().day-Math.floor(dateToOctaDate().day/73)*73).toString(8)}}
    .flex-1
    .font-bold {{dateToOctaDate().day%8}} 
    .flex-1
    .font-mono {{octime}}
  .flex.flex-col.gap-2.justify-around.shadow-lg.rounded-lg(v-for="(level,l) in levels" :key="level" )
    .p-2.flex.gap-4.font-mono.items-center.flex-1.transition-500(:style="{backgroundColor:colors[oct[l]]+'11'}") 
      .text-2xl {{oct[l]}}
      .op-90.font-mono.flex-1 {{level}}
      .flex-1
      .text-2xl {{arrows[oct[l]]}}
      .flex-1 
      .text-2xl {{trigrams[oct[l]]}}
    
    .p-2.bg-light-200.flex.gap-2
      .op-30.text-xs {{Number('0o'+oct.slice(0,l+1))}}/{{Math.pow(8,l+1)}}
      .flex-1
      .flex
        .p-1.m-1.flex-1.transition.border-1.border-dark-100.border-op-50.shadow.shadow-inset.rounded-xl(v-for="(row,r) in 8" :style="{backgroundColor:r==oct[l]?colors[oct[l]]:'transparent'}")


</template>