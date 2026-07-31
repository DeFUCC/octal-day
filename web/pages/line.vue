<script setup>
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors } from '../../src/useDay.js';


const oct = octalDayFraction

</script>

<template lang="pug">
section.rounded-xl.border-1.bg-orange-50.shadow-xl.flex-auto.p-4.gap-2.flex.flex-col
  h2.font-bold.text-lg Day
  .flex.flex-col.gap-2(v-for="(oct,o) in octalDayFraction.slice(0,6)")
    .font-mono {{oct}} {{levels[o]}}
    .flex.gap-2.flex-1
      .p-2.flex-1.transition.border-1.shadow.shadow-inset.rounded-xl(v-for="(row,r) in 8" :style="{backgroundColor:r==oct?'#fc0':'transparent'}")
  //- svg.w-full.h-full(viewBox="0 0 100% 100%")
    g(v-for="(oct,o) in octalDayFraction.slice(0,7)" :key="oct" :style="{transform:`translate(${o*10+2}%, 3%)`}")
      text(x="3%") {{oct}}
      g(v-for="(row,r) in 8" :key="row")
        circle(:cy="100-row*11+'%'" r="8" cx="4%" stroke-width="1" stroke="black" :fill="r==oct ? 'black' : 'transparent'")



</template>