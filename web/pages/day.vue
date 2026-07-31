<script setup>
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors } from '../../src/useDay.js';



const marks = levels.map((level, l) => {
  const scale = Math.pow(8, l + 1)
  const subdivision = 1 / scale
  const subs = []
  for (let s = 0; s <= scale; s++) {
    subs.push(subdivision * s)
  }
  return subs
})

</script>

<template lang="pug">
section.bg-orange-100.flex.flex-col


  .w-full.flex.flex-col.relative.flex-auto


    .w-full.h-1px.bg-gray.absolute.op-80(:style="{top:`${mark*100}%`}" v-for="mark in marks[1]" :key="mark")

    .w-full.h-2px.bg-black.absolute(:style="{top:`${mark*100}%`}" v-for="mark in marks[0]" :key="mark")


    .w-full.absolute.op-90.flex.flex-col.justify-end.transition(:style="{bottom:dayFraction*100+'%'}")
      .text-dark-800.p-2.bg-orange-600.bg-op-90.flex.gap-1()
        .font-bold {{((Math.floor(dayFraction*8)).toString(8))}} 
        span octant
      .h-2px.w-full.bg-orange

    .w-full.absolute.op-90.flex.flex-col.justify-end.transition(:style="{bottom:(dayFraction*8)%1*100+'%'}")
      .text-dark-800.p-2.bg-orange-500.bg-op-90.flex.gap-1()
        .font-bold {{((Math.floor((dayFraction*8)%1*8)).toString(8))}} 
        span session
      .h-2px.w-full.bg-orange-800

    .w-full.absolute.op-90.flex.flex-col.justify-end.transition(:style="{bottom:(dayFraction*64)%1*100+'%'}")
      .text-dark-800.p-2.bg-orange-400.bg-op-90.flex.gap-1()
        .font-bold {{((Math.floor((dayFraction*64)%1*8)).toString(8))}} 
        span topic
      .h-2px.w-full.bg-orange-800

    .w-full.absolute.op-90.flex.flex-col.justify-end.transition(:style="{bottom:(dayFraction*512)%1*100+'%'}")
      .text-dark-800.p-2.bg-orange-300.bg-op-90.flex.gap-1()
        .font-bold {{((Math.floor((dayFraction*512)%1*8)).toString(8))}} 
        span turn
      .h-2px.w-full.bg-orange-800

    .w-full.absolute.op-90.flex.flex-col.justify-end.transition(:style="{bottom:(dayFraction*4096)%1*100+'%'}")
      .text-dark-800.p-2.bg-orange-200.bg-op-90.flex.gap-1()
        .font-bold {{((Math.floor((dayFraction*4096)%1*8)).toString(8))}} 
        span phrase
      .h-2px.w-full.bg-orange-800

    .w-full.absolute.op-70.flex.flex-col.justify-end.transition(:style="{bottom:(dayFraction*4096*8)%1*100+'%'}")
      .h-1px.w-full.bg-orange-800


</template>