<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'


const T0 = new Date(`1761-06-06T05:19:00Z`)
const T1 = new Date(`1769-06-03T22:25:00Z`)
const UNIX_EPOCH = new Date(`1970-01-01T00:00:00Z`)
const UNIX_DAY = new Date(`1970-01-02T00:00:00Z`)
const JD0 = new Date(`2000-01-01T11:58:55.816Z`)
const T2 = new Date(`2004-06-08T08:20:00Z`)
const T3 = new Date(`2012-06-06T01:29:00Z`)
const today = new Date()
const T4 = new Date(`2247-06-11T11:33:00Z`)
const T5 = new Date(`2255-06-09T04:38:00Z`)

const T3_DAY = new Date(T3).setHours(0, 0, 0, 0)
const T5_DAY = new Date(T5).setHours(0, 0, 0, 0)
const ERA_DAYS = (T5_DAY - T3_DAY) / UNIX_DAY
const OCTAETERIS = Math.ceil((T3 - T2) / UNIX_DAY)
const SUNS = 8
const VENUSES = 5
const PETAL = OCTAETERIS / (SUNS * VENUSES)

function useDay(date) {

  const raw = { OCTAETERIS, ERA_DAYS }, octal = {}, render = {}
  if (!date) return { raw }
  raw.date = date
  raw.timestamp = new Date(date).getTime()
  raw.ut = (raw.timestamp - JD0) / UNIX_DAY
  raw.count = (new Date(date) - T3_DAY) / UNIX_DAY
  raw.days = ((raw.count % ERA_DAYS) + ERA_DAYS) % ERA_DAYS
  raw.era = Math.floor(raw.days / ERA_DAYS) + 1
  raw.int = Math.floor(raw.days)
  raw.transit = Math.floor(raw.int / OCTAETERIS)
  raw.transitDay = raw.int % OCTAETERIS
  raw.petal = Math.floor(raw.transitDay / PETAL)
  raw.petalOctave = Math.floor((raw.transitDay - PETAL * raw.petal) / 8)
  raw.sun = Math.floor(raw.petal / 5)
  raw.sunPetal = raw.petal - raw.sun * 5
  raw.venus = Math.floor(raw.petal / 8)
  raw.venusPetal = raw.petal - raw.venus * 8
  raw.progress = raw.days / ERA_DAYS

  octal.era = raw.era.toString(8)
  octal.day = raw.days.toString(8)
  octal.count = raw.int.toString(8)
  octal.time = (raw.days % 1).toString(8).slice(2)
  octal.transit = raw.transit.toString(8)
  octal.transitDay = raw.transitDay.toString(8)
  octal.transitOctave = raw.transitDay.toString(8).slice(0, -1)
  octal.octave = octal.count.slice(0, -1)
  octal.octaveDay = octal.count.slice(-1)
  octal.petal = raw.petal.toString(8)
  octal.petalOctave = raw.petalOctave.toString(8)

  octal.date = 'E' + octal.era + '-D' + octal.count.padStart(6, '0')

  render.transit = `e${octal.era}-t${octal.transit}-d${octal.transitDay}`
  render.octave = `e${octal.era}-t${octal.transit}-v${octal.transitOctave}-d${octal.octaveDay}`
  render.petal = `e${octal.era}-t${octal.transit}-p${octal.petal}-v${octal.petalOctave}-d${octal.octaveDay}`
  render.sun = `e${octal.era}-t${octal.transit}-s${raw.sun.toString(8)}-p${raw.sunPetal.toString(8)}-v${raw.petalOctave.toString(8)}-d${octal.octaveDay}`
  render.venus = `e${octal.era}-t${octal.transit}-n${raw.venus.toString(8)}-p${raw.venusPetal.toString(8)}-v${raw.petalOctave.toString(8)}-d${octal.octaveDay}`

  return { raw, octal, render }
}

function useDate({ count, time = 0, era = 1 } = {}) {
  return new Date(T3_DAY + ((era - 1) * ERA_DAYS + (parseInt(count, 8) + parseInt(time, 8) / (8 ** time.length))) * UNIX_DAY)
}

const now = useNow()
const day = computed(() => useDay(now.value))
const inputDate = ref()
const inputDay = ref('034422')
const inputTime = ref('236533')

</script>

<template lang="pug">
section.p-8.bg-green-100.w-full.h-full.overflow-y-scroll
  h2.text-xl.font-bold Octave 
  .flex
    pre {{day}}

  input(type="date" v-model="inputDate")
  pre {{useDay(inputDate)}}
  pre {{useDate(useDay(inputDate))}}
  input(v-model="inputDay")
  input(v-model="inputTime")
  pre {{useDate({day:inputDay, time:inputTime})}}
</template>