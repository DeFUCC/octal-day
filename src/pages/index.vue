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
section.bg-dark-100.w-full.overflow-y-scroll.flex.flex-col.gap-2.text-light-400.max-w-55ch.p-2.my-auto.rounded-xl.shadow-xl
    .p-4.text-8xl.text-center ∞
    code.mx-auto.text-2xl octal-day 
    .p-2.text-center.font-mono.flex.justify-center
        .bg-dark-800.text-xl.p-1.rounded.shadow {{day}}

    .p-2.flex.justify-center.gap-2.items-center
        
        code v.{{version}}
        a.underline.py-1.px-2.rounded-lg.bg-dark-600(href="https://npmjs.org/package/octal-day" target="_blank") NPM
        a.underline.py-1.px-2.rounded-lg.bg-dark-600(href="https://github.com/davay42/octal-day" target="_blank") GitHub
    .p-2 A fractal, base-8 temporal coordinate system grounded in the 243-year Earth-Venus orbital resonance.
    .p-2 <code>octal-day</code> projects any UNIX timestamp into the actual, unbroken rhythms of the inner solar system. Anchored by the 88,756-day and 2920-day Venus transit cycles and expressed through the native base-8 geometry of binary computing, it provides a mathematically pure timeline that scales seamlessly from 243-year macro-eras down to microsecond precision. Free from leap-year hacks and mythological naming conventions, it is an open-source instrument for developers, astronomers, and observers to ground their code, hardware, and daily lives in the observable truth of the cosmos.
    pre.p-4.bg-dark-600.whitespace-pre-wrap pnpm i octal-day
    .p-2 This very web-application uses the library extensively to explore the possible time organization patterns that emerge from the interactions with these scales. We explore how day fractions look on the screen and feel like when you synchronize for a turn, a topic or a whole session. We can see the whole octave of 8 days as our compact symmetric cycle or the whole 73-day petal an once. You can explore the code in our [Github repository]()
    .p-2 It takes a regular <code>Date.now()</code> timestamp in ms or the high precision nanosecond BigInt timestamp <code>performance.timeOrigin + performance.now()</code> and outputs a string that represents this moment on a continuous day counter, that connects the point in time with motions of Sun, Venus and Moon.
    .p-2 The octal representation shows current Era-Transit-Day base-8 count and time as the octal fraction of the local day.
</template>

<style scoped>
code {
    @apply py-1 px-2 rounded-lg bg-dark-600
}
</style>