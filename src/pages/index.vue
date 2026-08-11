<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'
import { octalDay, EPOCH_1 } from '../../README.md'
import { version } from '../../package.json'
import { planets } from '../useDay.js'

const now = useNow()
const day = computed(() => octalDay(now.value.getTime()))
const inputDate = ref()
const inputDay = ref('034422')
const inputTime = ref('236533')

const VENUS_T0 = new Date(`1761-06-06T05:19:00Z`)  // -6581846460000 
const VENUS_T1 = new Date(`1769-06-03T22:25:00Z`) // -6329583300000
const UNIX_EPOCH = new Date(`1970-01-01T00:00:00Z`) // 0
const UNIX_DAY = new Date(`1970-01-02T00:00:00Z`) // 86400000
const VENUS_T2 = new Date(`2004-06-08T08:20:00Z`) // 1086682800000
const VENUS_T3 = new Date(`2012-06-06T01:29:00Z`) // 1338946140000
const VENUS_T4 = new Date(`2247-06-11T11:33:00Z`) // 8755212780000
const VENUS_T5 = new Date(`2255-06-09T04:38:00Z`) // 9007475880000

const progress = computed(() => ERA_1)

</script>

<template lang="pug">
section.bg-dark-100.w-full.h-full.overflow-y-scroll.flex.flex-col.gap-2.text-light-400
    .p-8.text-center.font-mono
        h1.text-4xl {{day}}
    .p-8.bg-dark-300.flex.gap-8.items-center
        .flex.flex-col.items-center
            h2.text-2xl.font-bold Era 
            .text-4xl.font-mono {{day.split('-')[0]}}
        .flex.flex-col
            .text-md.max-w-45ch Era 0 lasted 243 years and passed between the moment Captain Cook observed the Venus Transit and 2012 live video broadcast of the next Transit opened the Era 1 of another 88756 days long ride. 
    .p-8.bg-dark-300.flex.gap-8.items-center
        .flex.flex-col.items-center
            h2.text-2xl.font-bold Transit
            .text-4xl.font-mono {{day.split('-')[1]}}
        .flex.flex-col
            .text-md.max-w-45ch A Transit is the Octaeteris - the 8 resonance between 8 Solar years, 5 Venus synodic cycles and 99 Moon cycles at 2920 days - 30.4 such cycles, so we will see 00-36 on this dial
    .p-8.bg-dark-300.flex.gap-8.items-center
        .flex.flex-col.items-center
            h2.text-2xl.font-bold Day
            .text-4xl.font-mono {{day.split('-')[2].split(' ')[0]}}
        .flex.flex-col
            .text-md.max-w-45ch We count from 0000 till 5550 and reset
    .p-8.bg-dark-300.flex.gap-8.items-center
        .flex.flex-col.items-center
            h2.text-2xl.font-bold Session
            .text-4xl.font-mono {{day.split(' ')[1].split(':')[0]}}
        .flex.flex-col
            .text-md.max-w-45ch It's the octant {{day.split(' ')[1].split(':')[0][0]}} and the sesion {{day.split(' ')[1].split(':')[0][1]}} in it.
    .flex-1
    .bg-dark-800.p-1.op-20.hover-op-80.transition.flex.gap-2
        a(href="https://github.com/defucc/octal-day" target="_blank") Code available at defucc/octal-day
        .flex-1
        .op-90 v.{{version}}
</template>