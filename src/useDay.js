import { useNow, useStorage } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { getMoonPhase, getOfflineSolarFraction, transits, CALENDAR_EPOCH, estimatedLongitude } from './astro.js'
import { AstroTime } from 'astronomy-engine'

const coord = useStorage('coords', {
  longitude: estimatedLongitude,
  latitude: 0,
  altitude: 0
})

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


const colors = ['#000000', '#0000Ff', '#00FF00', '#FF0000', '#FFFF00', '#FF00FF', '#00FFFF', '#CCCCCC']
const arrows = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘'];
const trigrams = ["☷", "☶", "☵", "☴", "☳", "☲", "☱", "☰"];




export { now, astro, octaDays, dayFraction, octalDayFraction, colors, textColors, levels, moon, coord, arrows, trigrams }
