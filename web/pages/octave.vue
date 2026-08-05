<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'

// Constants
const EPOCH_MS = new Date(`2012-06-06T01:29:00Z`).setHours(0, 0, 0, 0)
const ERA_DAYS = 88756
const DAY_MS = 864e5

const now = useNow()
const day = computed(() => useDay(now.value))

function useDay(date) {
  if (!date) return { raw: null }
  const raw = (new Date(date).getTime() - EPOCH_MS) / DAY_MS
  const era = Math.floor(raw / ERA_DAYS) + 1
  const decimal = ((raw % ERA_DAYS) + ERA_DAYS) % ERA_DAYS
  const dayInt = Math.floor(decimal)
  const fraction = decimal - dayInt

  return {
    era,
    day: dayInt.toString(8).padStart(6, '0'),
    time: fraction.toString(8).slice(2, 8).padEnd(6, '0'),
    date,
    raw,
    decimal,
    progress: decimal / ERA_DAYS
  }
}

function useDate({ day, time, era = 1 } = {}) {
  const dayDecimal = parseInt(day, 8)
  const timeDecimal = time ? parseInt(time, 8) / (8 ** time.length) : 0
  const decimal = dayDecimal + timeDecimal
  const raw = (era - 1) * ERA_DAYS + decimal

  return new Date(EPOCH_MS + raw * DAY_MS)
}

const inputDate = ref()
const inputDay = ref('034422')
const inputTime = ref('236533')
</script>

<template lang="pug">
section.p-8.bg-green-100.w-full.h-full.overflow-y-scroll
  h2.text-xl.font-bold Octave
  pre {{day}}
  input(type="date" v-model="inputDate")
  pre {{useDay(inputDate)}}
  pre {{useDate(useDay(inputDate))}}
  input(v-model="inputDay")
  input(v-model="inputTime")
  pre {{useDate({day:inputDay, time:inputTime})}}
</template>