<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Globe from 'globe.gl'
import * as THREE from 'three'
import { AstroTime, MoonPhase } from 'astronomy-engine'

import moonImage from '../../maps/2k_moon.jpg?base64'
import nightSky from '../../maps/night-sky.png?base64'

const globeViz = ref(null)
let globe = null
let animationFrameId = null
let sunLight = null

onMounted(async () => {
  const textureLoader = new THREE.TextureLoader()
  const moonTexture = textureLoader.load(moonImage)

  if (THREE.SRGBColorSpace) moonTexture.colorSpace = THREE.SRGBColorSpace

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x808080), // NEW: Multiplies texture by 50%
    map: moonTexture,
    bumpMap: moonTexture,             // Bump map ignores material color, so relief stays crisp!
    bumpScale: 3.0,
    shininess: 0,
    specular: new THREE.Color(0x000000)
  })

  globe = new Globe(globeViz.value)
    .globeMaterial(moonMaterial)
    .showAtmosphere(false)
    .backgroundImageUrl(nightSky)

  const renderer = globe.renderer()
  renderer.toneMapping = THREE.NoToneMapping
  if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace

  sunLight = new THREE.DirectionalLight(0xffffff, 22.4) // Changed from 1.2 to 2.4
  globe.scene().add(sunLight)

  // ========== MOON GRID & LABELS ==========
  const LNG_DIVS = 64
  const STEP_LNG = 360 / LNG_DIVS

  function generateMoonGrid() {
    const paths = []

    // 1. Meridians: Center line (40) and 16 sector boundaries (every 4 divisions)
    for (let i = 0; i <= LNG_DIVS; i++) {
      if (i === 32 || i % 4 === 0) {
        const lng = -180 + (i * STEP_LNG)
        const points = []
        for (let lat = -90; lat <= 90; lat += 1) points.push([lat, lng])

        const isCenter = i === 32
        paths.push({
          points,
          color: isCenter ? 'rgba(255, 200, 50, 0.9)' : 'rgba(255, 255, 255, 0.25)',
          stroke: isCenter ? 1.2 : 0.72
        })
      }
    }

    // 2. Equator
    const equatorPoints = []
    for (let lng = -180; lng <= 180; lng += 2) equatorPoints.push([0, lng])
    paths.push({
      points: equatorPoints,
      color: 'rgba(255, 200, 50, 0.9)',
      stroke: 1.2
    })

    return paths
  }

  function generateMoonLabels() {
    const labels = []

    // Near side sector labels (0-7)
    for (let s = 0; s < 8; s++) {
      const i = 34 + (s * 4) // Centers of the 8 near-side sectors
      labels.push({
        lat: 0,
        lng: -180 + (i * STEP_LNG),
        text: s.toString(8),
        color: 'rgba(255, 255, 255, 0.7)',
        size: 0.4,
        altitude: 0.015
      })
    }

    // Far side sector labels (0-7)
    for (let s = 0; s < 8; s++) {
      const i = 2 + (s * 4) // Centers of the 8 far-side sectors
      labels.push({
        lat: 0,
        lng: -180 + (i * STEP_LNG),
        text: s.toString(8),
        color: 'rgba(255, 255, 255, 0.4)', // Dimmer to imply it's the far side
        size: 0.4,
        altitude: 0.015
      })
    }

    // Center line label
    labels.push({
      lat: 0,
      lng: 0,
      text: '4',
      color: 'rgba(255, 200, 50, 0.9)',
      size: 0.5,
      altitude: 0.02
    })

    return labels
  }

  globe.pathsData(generateMoonGrid())
    .pathPoints('points')
    .pathPointLat(p => p[0])
    .pathPointLng(p => p[1])
    .pathColor('color')
    .pathStroke('stroke')
    .labelsData(generateMoonLabels())
    .labelLat('lat')
    .labelLng('lng')
    .labelText('text')
    .labelColor('color')
    .labelSize('size')
    .labelAltitude('altitude')
    .labelIncludeDot(false)
    .labelResolution(4)
    .labelsTransitionDuration(0)

  // ========== ANIMATION LOOP ==========
  const animate = () => {
    const dt = new Date()
    const phase = MoonPhase(new AstroTime(dt))
    const rad = phase * (Math.PI / 180)

    // Phase 0 (New): Light from -Z (back)
    // Phase 90 (First Q): Light from -X (right)
    // Phase 180 (Full): Light from +Z (front)
    // Phase 270 (Third Q): Light from +X (left)
    const x = -Math.sin(rad)
    const z = -Math.cos(rad)

    sunLight.position.set(x, 0, z).multiplyScalar(100)
    animationFrameId = requestAnimationFrame(animate)
  }

  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (globe) globe._destructor()
})
</script>

<template lang="pug">
section
  #globeViz(ref="globeViz")
</template>

<style scoped>
section {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #000;
}

#globeViz {
  width: 100%;
  height: 100%;
}
</style>