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
section.bg-dark-100.w-full.overflow-y-scroll.flex.flex-col.gap-2.text-light-400.text-sm.max-w-55ch.p-2.my-auto.rounded-xl.shadow-xl
    .p-2.text-center.font-mono.flex.justify-center
        .bg-dark-800.text-xl.p-1.rounded.shadow {{day}}

    .p-2.flex.justify-center.gap-2.items-center
        code octal-day v.{{version}}
        a.underline(href="https://npmjs.org/package/octal-day" target="_blank") NPM
        a.underline(href="https://github.com/defucc/octal-day" target="_blank") GitHub
    .p-2 A 0-dependency UNIX timestamp deep time grounding system in a base-8 string representation. 
    pre.p-4.bg-dark-600.whitespace-pre-wrap pnpm i octal-day
    .p-2 Based on Venus transit long cycle (88756 days) and short cycle (2920 days), it provides an octal grid for observational astronomy and inner Solar system cycles approximation, that enables new ways of time navigation.
    pre.p-4.bg-dark-600.text-xs.whitespace-pre-wrap.
        import {octalDay, octalDate} from 'octal-day'
        const now = Date.now() // 1786519637731
        const octal = octalDay(now) // "1-02-4324 01:15:51"
        const timestamp = octalDate(octal) //1786519637731
    .p-2 It takes a regular <code>Date.now()</code> timestamp in ms or the high precision nanosecond BigInt timestamp <code>performance.timeOrigin + performance.now()</code> and outputs a string that represents this moment on a continuous day counter, that connects the point in time with motions of Sun, Venus and Moon.
    .p-2 The octal representation shows current Era, Transit, Day in the transit and time as the octal fraction of the local day.
</template>

<style scoped>
code {
    @apply p-1 rounded-lg bg-dark-600
}
</style>