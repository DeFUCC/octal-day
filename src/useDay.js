import { useNow, useStorage } from '@vueuse/core'
import { computed, reactive, watch } from 'vue'
import { getMoonPhase, getOfflineSolarFraction, transits, CALENDAR_EPOCH, estimatedLongitude } from './astro.js'
import { AstroTime } from 'astronomy-engine'

const coordStorage = useStorage('coords', {
  longitude: 100,
  latitude: 0,
  altitude: 0
})

const coord = reactive({
  longitude: coordStorage.value.longitude ?? 100,
  latitude: coordStorage.value.latitude ?? 0,
  altitude: coordStorage.value.altitude ?? 0,
})

watch(coordStorage, (value) => {
  coord.longitude = value?.longitude ?? 100
  coord.latitude = value?.latitude ?? 0
  coord.altitude = value?.altitude ?? 0
}, { deep: true })

watch(coord, (value) => {
  coordStorage.value = {
    longitude: value.longitude,
    latitude: value.latitude,
    altitude: value.altitude,
  }
}, { deep: true })

const now = useNow()
const astro = computed(() => new AstroTime(now.value))
const octaDays = computed(() => astro.value.ut - CALENDAR_EPOCH.ut)
const dayFraction = computed(() => getOfflineSolarFraction(astro.value, coord.longitude))
const octalDayFraction = computed(() => {
  const safeFraction = Math.min(dayFraction.value, 0.999999999);
  const octalString = safeFraction.toString(8);
  const fractionalPart = octalString.split('.')[1];
  const digits = fractionalPart.padEnd(5, '0');
  return digits
})

export const octime = computed(() => {
  return Array(3).fill(null).map((_, i) => octalDayFraction.value[i * 2] + octalDayFraction.value[i * 2 + 1]).join(':')
})

const moon = computed(() => getMoonPhase(astro.value))

const textColors = ['#ffffff', '#fff', '#000', '#000', '#000', '#000', '#000', '#000',]
const levels = ['Octant', 'Session', 'Topic', 'Turn', 'Phrase', 'Beat']
const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

const colors = ['#000000', '#0000FF', '#00FF00', '#FF0000', '#FFFF00', '#FF00FF', '#00FFFF', '#CCCCCC']
const arrows = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘'];
const trigrams = ["☷", "☶", "☵", "☴", "☳", "☲", "☱", "☰"];

const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];



export { now, astro, octaDays, dayFraction, octalDayFraction, colors, textColors, levels, moon, coord, arrows, trigrams, planets, moonPhases }
