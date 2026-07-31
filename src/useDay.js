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
const dayFraction = computed(() => getOfflineSolarFraction(astro.value))
const octalDayFraction = computed(() => {
  const safeFraction = Math.min(dayFraction.value, 0.999999999);
  const octalString = safeFraction.toString(8);
  const fractionalPart = octalString.split('.')[1];
  const digits = fractionalPart.padEnd(5, '0');
  return digits
})
const moon = computed(() => getMoonPhase(astro.value))

const colors = ['#000', '#00F', '#0F0', '#F00', '#FF0', '#F0F', '#0FF', '#FFF']
const textColors = ['#fff', '#fff', '#000', '#000', '#000', '#000', '#000', '#000',]
const levels = ['Octant', 'Session', 'Topic', 'Turn', 'Phrase', 'Beat']
const arrows = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘'];
const trigrams = ["☷", "☶", "☵", "☴", "☳", "☲", "☱", "☰"]


export { now, astro, octaDays, dayFraction, octalDayFraction, colors, textColors, levels, moon, coord, arrows, trigrams }
