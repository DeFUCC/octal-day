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
        h1.text-4xl {{day.split(' ')[1]}}
    .grid.gap-4.max-w-65ch(style="  grid-template-columns: 8em 1fr")
    
        .flex.flex-col.items-center.p-4.bg-dark-400.justify-center
            h2.text-2xl Session
            .text-4xl.font-mono {{day.split(' ')[1].split(':')[0]}}
        .flex.flex-col.p-4.justify-center.bg-dark-300
            .text-md.max-w-45ch Each day is divided into 8 even octants <code>3</code> hours each. Each octant contains 8 sessions of <code>22.5 minutes</code>. It's the session {{day.split(' ')[1].split(':')[0][1]}} in the octant {{day.split(' ')[1].split(':')[0][0]}} of this day now, or just session {{day.split(' ')[1].split(':')[0]}}.
    
        .flex.flex-col.items-center.p-4.bg-dark-400.justify-center
            h2.text-2xl Turn
            .text-4xl.font-mono {{day.split(' ')[1].split(':')[1]}}
        .flex.flex-col.p-4.justify-center.bg-dark-300
            .text-md.max-w-45ch Each session has 8 topics of <code>2.8125</code> minutes, each containing 8 turns of <code>21.09375</code> seconds. It's the topic {{day.split(' ')[1].split(':')[1][0]}} and the turn {{day.split(' ')[1].split(':')[1][1]}} in it now, or simply turn {{day.split(' ')[1].split(':')[1]}}.
    
        .flex.flex-col.items-center.p-4.bg-dark-400.justify-center
            h2.text-2xl Beat
            .text-4xl.font-mono {{day.split(' ')[1].split(':')[2]}}
        .flex.flex-col.p-4.justify-center.bg-dark-300
            .text-md.max-w-45ch It's the phrase {{day.split(' ')[1].split(':')[2][0]}} and the beat {{day.split(' ')[1].split(':')[2][1]}} in it.

</template>

<style scoped>
code {
    @apply py-1 px-2 rounded-lg bg-dark-600
}
</style>