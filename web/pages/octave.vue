<script setup>
import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'
import { AstroTime } from 'astronomy-engine'


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

const T3_DAY = T3.setHours(0, 0, 0, 0)
const T5_DAY = T5.setHours(0, 0, 0, 0)
const ERA_DAYS = (T5 - T3) / UNIX_DAY
const count = (date) => (new Date(date) - T3_DAY) / UNIX_DAY
const eraCount = (date) => ((count(date) % ERA_DAYS) + ERA_DAYS) % ERA_DAYS
const eras = (date) => Math.floor(count(date) / ERA_DAYS) + 1

function useDay(date) {

  const d = { raw: {}, octal: {}, render: {} }
  if (!date) return d
  d.raw.date = date
  d.raw.timestamp = new Date(date).getTime()
  d.raw.count = count(date)
  d.raw.ut = (d.raw.timestamp - JD0) / UNIX_DAY
  d.raw.int = Math.floor(d.raw.count)
  d.era = eras(date)

  d.day = d.raw.int.toString(8).padStart(6, '0')
  d.octave = Math.floor(d.raw.int / 8).toString(8).padStart(6, '0')
  d.quintant = Math.floor(d.raw.int / 73)
  d.time = (d.raw.count % 1).toString(8).slice(2).padEnd(6, '0')
  d.octal.count = d.day + '.' + d.time.slice(0, 6)
  d.octal.date = 'E' + d.era + '-D' + d.octal.count
  d.progress = d.octal.count / ERA_DAYS
  d.render = {
    octave: `E${d.era}-v${d.day.slice(1)}-D${(d.day.slice(-1))}`,
    quintant: `E${d.era}-q${d.quintant.toString(8).padStart(4, '0')}-v${Math.floor((d.raw.int - 73 * d.quintant) / 8).toString(8).padStart(2, '0')}-D${d.day.slice(-1)}`,
    sun: `E${d.era}-s${d.quintant}-v${Math.floor((d.raw.int - 73 * d.quintant) / 8).toString(8).padStart(2, '0')}-D${d.day.slice(-1)}`,
  }

  return d
}

function useDate({ day, time = 0, era = 1 } = {}) {
  return new Date(T3_DAY + ((era - 1) * ERA_DAYS + (parseInt(day, 8) + parseInt(time, 8) / (8 ** time.length))) * UNIX_DAY)
}

const now = useNow()
const day = computed(() => useDay(now.value))
const inputDate = ref()
const inputDay = ref('034422')
const inputTime = ref('236533')

</script>

<template lang="pug">
section.p-8.bg-green-100.w-full.h-full.overflow-y-scroll
  h2.text-xl.font-bold Octave {{new AstroTime(new Date()).ut}}
  .flex
    pre {{day}}

  input(type="date" v-model="inputDate")
  pre {{useDay(inputDate)}}
  pre {{useDate(useDay(inputDate))}}
  input(v-model="inputDay")
  input(v-model="inputTime")
  pre {{useDate({day:inputDay, time:inputTime})}}
</template>