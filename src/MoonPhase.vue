<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  size: { type: Number, default: 220 },
  phase: { type: Number, default: null },
  showLabel: { type: Boolean, default: true },
  live: { type: Boolean, default: true },
})

const uid = Math.random().toString(36).slice(2, 9)

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)
const R = computed(() => props.size * 0.34)
const blurStd = computed(() => Math.max(0.5, props.size * 0.005))
// noise frequencies are tied to size so the texture scale looks the same
// (roughly the same number of blobs/speckles across the disk) at any prop size
const mariaFreq = computed(() => 4.5 / props.size)
const finFreq = computed(() => 22 / props.size)

// ---------- real-world phase ----------
const SYNODIC_MONTH = 29.530588861 // days
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0) // a reference new moon

function phaseFromDate(date) {
  const diffDays = (date.getTime() - KNOWN_NEW_MOON) / 86400000
  let p = (diffDays % SYNODIC_MONTH) / SYNODIC_MONTH
  if (p < 0) p += 1
  return p
}

const liveDatePhase = ref(phaseFromDate(new Date()))
let liveTimer = null

const targetPhase = computed(() => {
  if (props.phase !== null && props.phase !== undefined) {
    return ((props.phase % 1) + 1) % 1
  }
  return liveDatePhase.value
})

// ---------- smooth interpolation ----------
const displayPhase = ref(targetPhase.value)
let rafId = null
let lastTime = null

function shortestDelta(from, to) {
  let d = (to - from) % 1
  if (d > 0.5) d -= 1
  if (d < -0.5) d += 1
  return d
}

function tick(now) {
  if (lastTime === null) lastTime = now
  const dt = (now - lastTime) / 1000
  lastTime = now

  const delta = shortestDelta(displayPhase.value, targetPhase.value)
  if (Math.abs(delta) < 0.0004) {
    displayPhase.value = targetPhase.value
    rafId = null
    lastTime = null
    return
  }
  const step = delta * Math.min(1, dt * 4.5)
  displayPhase.value = ((displayPhase.value + step) % 1 + 1) % 1
  rafId = requestAnimationFrame(tick)
}

function ensureLoop() {
  if (rafId === null) {
    lastTime = null
    rafId = requestAnimationFrame(tick)
  }
}

watch(targetPhase, ensureLoop)

onMounted(() => {
  ensureLoop()
  if (props.live) {
    liveTimer = setInterval(() => {
      liveDatePhase.value = phaseFromDate(new Date())
    }, 60_000)
  }
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  if (liveTimer) clearInterval(liveTimer)
})

// ---------- terminator path ----------
function buildPath(phase, cxV, cyV, r) {
  const twoPi = Math.PI * 2
  const top = `${cxV},${cyV - r}`
  const bottom = `${cxV},${cyV + r}`
  let limbSweep, theta

  if (phase <= 0.5) {
    limbSweep = 1 // right limb is the constant edge while waxing
    theta = twoPi * phase
  } else {
    limbSweep = 0 // left limb is the constant edge while waning
    theta = twoPi * (phase - 0.5)
  }

  const rx = r * Math.abs(Math.cos(theta))
  const sweepT = Math.cos(theta) >= 0 ? 0 : 1

  return `M${top} A${r},${r} 0 0,${limbSweep} ${bottom} A${rx},${r} 0 0,${sweepT} ${top} Z`
}

const litPath = computed(() => buildPath(displayPhase.value, cx.value, cy.value, R.value))

const illumination = computed(() =>
  Math.round(((1 - Math.cos(2 * Math.PI * displayPhase.value)) / 2) * 100)
)

const phaseName = computed(() => {
  const p = displayPhase.value
  const eps = 0.02
  if (p < eps || p > 1 - eps) return 'New Moon'
  if (Math.abs(p - 0.25) < eps) return 'First Quarter'
  if (Math.abs(p - 0.5) < eps) return 'Full Moon'
  if (Math.abs(p - 0.75) < eps) return 'Last Quarter'
  if (p < 0.25) return 'Waxing Crescent'
  if (p < 0.5) return 'Waxing Gibbous'
  if (p < 0.75) return 'Waning Gibbous'
  return 'Waning Crescent'
})

const rootStyle = computed(() => ({ width: `${props.size}px` }))
</script>

<template>
  <div class="moon-phase" :style="rootStyle">
    <svg :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size" aria-hidden="true">
      <defs>
        <radialGradient :id="`lit-${uid}`" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stop-color="#fffdf3" />
          <stop offset="45%" stop-color="#f1e8d6" />
          <stop offset="100%" stop-color="#b6ac97" />
        </radialGradient>
        <radialGradient :id="`dark-${uid}`" cx="62%" cy="66%" r="80%">
          <stop offset="0%" stop-color="#2b2645" />
          <stop offset="55%" stop-color="#18142280" />
          <stop offset="100%" stop-color="#0b0910" />
        </radialGradient>
        <radialGradient :id="`glow-${uid}`" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(247,231,180,0.38)" />
          <stop offset="55%" stop-color="rgba(247,231,180,0.10)" />
          <stop offset="100%" stop-color="rgba(247,231,180,0)" />
        </radialGradient>
        <clipPath :id="`disk-clip-${uid}`">
          <circle :cx="cx" :cy="cy" :r="R" />
        </clipPath>
        <clipPath :id="`lit-clip-${uid}`">
          <path :d="litPath" />
        </clipPath>
        <filter :id="`soften-${uid}`" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur :stdDeviation="blurStd" />
        </filter>

        <!-- large soft dark patches, mare-like -->
        <filter :id="`maria-${uid}`" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" :baseFrequency="mariaFreq" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0.35 0.35 0.35 0 -0.2" result="a" />
          <feComponentTransfer in="a">
            <feFuncA type="gamma" amplitude="1" exponent="2.4" offset="0" />
          </feComponentTransfer>
        </filter>

        <!-- fine bump-mapped crater relief, lit from one side -->
        <filter :id="`bump-${uid}`" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" :baseFrequency="finFreq" numOctaves="3" seed="11" result="n2" />
          <feDiffuseLighting in="n2" surfaceScale="1.8" diffuseConstant="1.1" lighting-color="#fff8ec" result="lit">
            <feDistantLight azimuth="235" elevation="55" />
          </feDiffuseLighting>
          <feComponentTransfer in="lit">
            <feFuncR type="linear" slope="0.55" intercept="0.2" />
            <feFuncG type="linear" slope="0.55" intercept="0.2" />
            <feFuncB type="linear" slope="0.55" intercept="0.2" />
          </feComponentTransfer>
        </filter>
      </defs>

      <circle class="halo" :cx="cx" :cy="cy" :r="R * 1.55" :fill="`url(#glow-${uid})`" />

      <g :clip-path="`url(#disk-clip-${uid})`">
        <circle :cx="cx" :cy="cy" :r="R" :fill="`url(#dark-${uid})`" />
        <path :d="litPath" :fill="`url(#lit-${uid})`" :filter="`url(#soften-${uid})`" />
        <g :clip-path="`url(#lit-clip-${uid})`">
          <rect :x="cx - R" :y="cy - R" :width="R * 2" :height="R * 2" fill="#000" :filter="`url(#maria-${uid})`"
            style="mix-blend-mode: multiply" opacity="0.55" />
          <rect :x="cx - R" :y="cy - R" :width="R * 2" :height="R * 2" fill="#808080" :filter="`url(#bump-${uid})`"
            style="mix-blend-mode: overlay" opacity="0.4" />
        </g>
      </g>

      <circle :cx="cx" :cy="cy" :r="R" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
    </svg>

    <div v-if="showLabel" class="label">
      <span>{{ phaseName }}</span>
      <span class="illum">{{ illumination }}%</span>
    </div>
  </div>
</template>


<style scoped>
.moon-phase {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
}

.moon-phase svg {
  display: block;
}

.halo {
  animation: moon-glow-pulse 6s ease-in-out infinite;
  transform-origin: center;
}

@keyframes moon-glow-pulse {

  0%,
  100% {
    opacity: 0.85;
  }

  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .halo {
    animation: none;
  }
}

.label {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--moon-label-color, #9891b0);
}

.label .illum {
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}
</style>