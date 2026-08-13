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

const progress = computed(() => ERA_1)

</script>

<template lang="pug">
section.bg-dark-100.w-full.h-full.overflow-y-scroll.flex.flex-col.items-center.gap-2.text-light-400.p-4
    .p-8.text-center.font-mono
        h1.text-4xl {{day.split(' ')[0]}}
    .grid.gap-4.max-w-65ch(style="  grid-template-columns: 8em 1fr")
    
        .flex.flex-col.items-center.p-4.bg-dark-400.justify-center
            h2.text-2xl Era 
            .text-4xl.font-mono {{day.split('-')[0]}}
        .flex.flex-col.p-4.justify-center.bg-dark-300
            .text-md.max-w-45ch 
            Era 0 lasted <code>243</code> years and passed between the moment Mikhail Lomonosov observed the Venus cross the disc of the Sun in <code>1761</code> and <code>2004</code> live video broadcast of the next transit VT-2004 opened the Era 1 for another <code>88756</code> days long ride. 
    
        .flex.flex-col.items-center.p-4.bg-dark-400.justify-center
            h2.text-2xl Transit
            .text-4xl.font-mono {{day.split('-')[1]}}
        .flex.flex-col.p-4.justify-center.bg-dark-300
            .text-md.max-w-45ch A Transit is the Octaeteris - the <code>8:5:13</code> resonance between 8 Solar years, 5 Venus synodic cycles and 99 Moon cycles at <code>2920</code> days - <code>30.4</code> such cycles, so we will see 00-36 on this dial until next Era transit observation.
    
        .flex.flex-col.items-center.p-4.bg-dark-400.justify-center
            h2.text-2xl Day
            .text-4xl.font-mono {{day.split('-')[2].split(' ')[0]}}
        .flex.flex-col.p-4.justify-center.bg-dark-300
            .text-md.max-w-45ch We count from 0000 till 5550 and reset, incrementing by one Transit

</template>

<style scoped>
code {
    @apply py-1 px-2 rounded-lg bg-dark-600
}
</style>