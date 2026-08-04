<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Globe from 'globe.gl'
import * as THREE from 'three'
import { AstroTime, Body, Equator, SiderealTime, Observer } from 'astronomy-engine'

// Your existing imports
import { transits } from '../../src/astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors, coord, arrows, trigrams } from '../../src/useDay.js'

// Map imports
import globeImage from '../../maps/earth-blue-marble.jpg?base64'
import nightImage from '../../maps/2k_earth_nightmap.jpg?base64'
import nightSky from '../../maps/night-sky.png?base64'
// import bumpMap from '../../maps/earth-topology.png?base64'

const globeViz = ref(null)
let globe = null
let animationFrameId = null
let sunDirectionUniform = null

/**
 * Calculates the exact 3D direction of the Sun in the Earth's Local Space
 */
/**
 * Calculates the exact 3D direction of the Sun using astronomy-engine
 */
const getSunDirectionVector = (dt) => {
  const astroTime = new AstroTime(new Date(dt))
  const observer = new Observer(0, coord.longitude, 0)

  // 1. Get the Sun's apparent equatorial coordinates
  const eq = Equator(Body.Sun, astroTime, observer, true, false)
  const lat = eq.dec

  // 2. Convert Greenwich sidereal time to the observer's local sidereal time
  const gast = SiderealTime(astroTime)
  const localSiderealTime = gast + coord.longitude / 15

  // 3. Derive the sub-solar longitude for the selected longitude
  const lon = (eq.ra - localSiderealTime) * 15

  // 4. Convert latitude/longitude to a 3D direction vector in the globe's local space
  const latRad = lat * (Math.PI / 180)
  const lonRad = lon * (Math.PI / 180)

  const x = Math.cos(latRad) * Math.sin(lonRad)
  const y = -Math.sin(latRad)
  const z = Math.cos(latRad) * Math.cos(lonRad)

  return new THREE.Vector3(x, y, z)
}

onMounted(async () => {
  // 1. Load Textures
  const textureLoader = new THREE.TextureLoader()
  const dayTexture = textureLoader.load(globeImage)
  const nightTexture = textureLoader.load(nightImage)

  // 2. Define the Custom Shader
  const dayNightMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture: { value: dayTexture },
      nightTexture: { value: nightTexture },
      sunDirection: { value: new THREE.Vector3(1, 0, 0) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        // THE FIX: Keep the normal in Local Space (Object Space).
        // This ensures the normal rotates WITH the globe's geography, 
        // staying perfectly synced with the local-space sunDirection.
        vNormal = normalize(normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D dayTexture;
      uniform sampler2D nightTexture;
      uniform vec3 sunDirection;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);
        
        // The globe uses outward-facing normals, so the illumination term must be
        // flipped to match the sun direction vector derived from the selected longitude.
        float intensity = -dot(vNormal, normalize(sunDirection));
        
        // smoothstep creates a soft twilight terminator line
        float blendFactor = smoothstep(-0.1, 0.2, intensity);
        
        vec4 finalColor = mix(nightColor, dayColor, blendFactor);
        gl_FragColor = finalColor;
      }
    `
  })

  sunDirectionUniform = dayNightMaterial.uniforms.sunDirection

  // 3. Initialize Globe
  globe = new Globe(globeViz.value)
    .globeMaterial(dayNightMaterial)
    // .bumpImageUrl(bumpMap)
    .backgroundImageUrl(nightSky)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.1)
    .pointAltitude('size')
    .pointColor('color')

  // 4. Animation Loop
  const animate = () => {
    const dt = Date.now()

    // Update the sun direction for the shader
    const sunDir = getSunDirectionVector(dt)
    sunDirectionUniform.value.copy(sunDir)

    animationFrameId = requestAnimationFrame(animate)
  }

  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (globe) globe._destructor()
})


//=========



async function getLocation() {
  let position
  try {
    position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
    });
    coord.longitude = position.coords.longitude
    coord.latitude = position.coords.latitude
    coord.altitude = position.coords.altitude || 0
  } catch (e) { console.log(e) }

}
</script>

<template lang="pug">
section
  #globeViz(ref="globeViz")
  dialog(open)
    .p-4.flex.flex-wrap.gap-2
      label.flex.gap-2.items-center.flex-1
        .p-0 Lat
        input.p-2(v-model="coord.latitude" placeholder="45.0" )
      label.flex.gap-2.items-center.flex-1
        .p-0 Long
        input.p-2(v-model="coord.longitude" placeholder="45.0" )
      button.flex-full.p-2.bg-dark-200.text-white.rounded-lg(@click="getLocation()") Locate
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