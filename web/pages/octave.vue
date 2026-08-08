<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useDay, useDate } from '../../src/index.js'

const now = useNow()
const day = computed(() => useDay(now.value.getTime()))
const inputDate = ref()
const inputDay = ref('034422')
const inputTime = ref('236533')

</script>

<template lang="pug">
section.p-8.bg-green-100.w-full.h-full.overflow-y-scroll.flex.flex-col.gap-2
    h1.text-2xl.font-mono.font-bold Day:  {{day.render.era}}.{{day.render.time}}
    pre {{useDate(day.render.era)}}
    h2.text-xl.font-bold Octave: {{day.render.octave}}.{{day.render.time}}
    pre {{useDate(day.render.octave)}}
    h2.text-xl.font-bold Petal: {{day.render.petal}}.{{day.render.time}}    
    pre {{useDate(day.render.petal)}}



</template>