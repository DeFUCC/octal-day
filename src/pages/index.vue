<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'
import { octalDay } from '../../README.md'

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

</script>

<template lang="pug">
section.p-8.bg-green-100.w-full.h-full.overflow-y-scroll.flex.flex-col.gap-2
    h1.text-4xl {{day}}

</template>