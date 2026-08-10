<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Globe from 'globe.gl'
import * as THREE from 'three'
import { AstroTime, Body, Equator, SiderealTime, Observer } from 'astronomy-engine'

// Your existing imports
import { transits } from '../astro.js'
import { now, astro, octaDays, dayFraction, octalDayFraction, levels, colors, coord, arrows, trigrams } from '../useDay.js'

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

  function generateGridPaths() {
    const paths = [];
    const LNG_DIVS = 64;   // Longitude: 64 divisions (0..64 lines)
    const LAT_DIVS = 32;   // Latitude: 32 divisions (0..32 lines)
    const STEP_LNG = 360 / LNG_DIVS;  // 5.625°
    const STEP_LAT = 180 / LAT_DIVS;  // 5.625° — same angular step!

    // ========== MERIDIANS (Longitude lines) ==========
    for (let i = 0; i <= LNG_DIVS; i++) {
      const lng = -180 + (i * STEP_LNG);
      const points = [];
      for (let lat = -90; lat <= 90; lat += 1) points.push([lat, lng]);

      // Highlight Prime Meridian (0°) and Date Line (±180°)
      const isPrimeMeridian = i === 32;      // 0o40
      const isDateLine = i === 0 || i === 64; // ±180°

      paths.push({
        points,
        color: isPrimeMeridian ? 'rgba(255, 200, 50, 0.9)' :
          isDateLine ? 'rgba(255, 100, 100, 0.6)' :
            'rgba(255, 255, 255, 0.78)',
        stroke: isPrimeMeridian ? 1.2 :
          isDateLine ? 0.8 :
            0.15
      });
    }

    // ========== PARALLELS (Latitude lines) ==========
    for (let j = 0; j <= LAT_DIVS; j++) {
      const lat = -90 + (j * STEP_LAT);
      const points = [];
      for (let lng = -180; lng <= 180; lng += 2) points.push([lat, lng]);

      // Highlight Equator (0°)
      const isEquator = j === 16;  // halfway: 32/2 = 16

      paths.push({
        points,
        color: isEquator ? 'rgba(255, 200, 50, 0.9)' :
          'rgba(255, 255, 255, 0.88)',
        stroke: isEquator ? 1.2 : 0.15
      });
    }

    return paths;
  }

  // 3. Initialize Globe
  globe = new Globe(globeViz.value)
    .globeMaterial(dayNightMaterial)
    .pathsData(generateGridPaths())
    .pathPoints('points')
    .pathPointLat(p => p[0])
    .pathPointLng(p => p[1])
    .pathColor('color')
    .pathStroke('stroke')
    .backgroundImageUrl(nightSky)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.1)
    .pointAltitude('size')
    .pointColor('color');

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