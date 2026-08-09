<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useDay } from '../../src/index.js'

const now = useNow()
const day = computed(() => useDay(now.value.getTime()))
const inputDate = ref()
const inputDay = ref('034422')
const inputTime = ref('236533')

</script>

<template lang="pug">
section.p-8.bg-green-100.w-full.h-full.overflow-y-scroll.flex.flex-col.gap-2
    pre {{day}}

</template>