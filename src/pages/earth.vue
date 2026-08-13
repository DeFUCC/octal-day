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
import bumpMap from '../../maps/earth-topology.png?base64' // 1. UNCOMMENTED

const globeViz = ref(null)
let globe = null
let animationFrameId = null
let sunDirectionUniform = null

const getSunDirectionVector = (dt) => {
  const astroTime = new AstroTime(new Date(dt))
  const observer = new Observer(0, coord.longitude, 0)

  const eq = Equator(Body.Sun, astroTime, observer, true, false)
  const lat = eq.dec
  const gast = SiderealTime(astroTime)
  const localSiderealTime = gast + coord.longitude / 15
  const lon = (eq.ra - localSiderealTime) * 15

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
  const bumpTexture = textureLoader.load(bumpMap) // 2. LOAD BUMP TEXTURE

  // 3. Define the Custom Shader with Bump Mapping
  const dayNightMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture: { value: dayTexture },
      nightTexture: { value: nightTexture },
      bumpTexture: { value: bumpTexture },      // NEW: Topology map
      sunDirection: { value: new THREE.Vector3(1, 0, 0) },
      bumpScale: { value: 8.0 }                 // NEW: Tweak this to make mountains more/less pronounced
    },
    vertexShader: `
      varying vec2 vUv;
      varying mat3 vTBN; // Tangent-Bitangent-Normal matrix in LOCAL space

      void main() {
        vUv = uv;
        
        // 1. Local space vectors for a perfect sphere
        vec3 localNormal = normalize(position);
        vec3 up = abs(localNormal.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);
        vec3 tangent = normalize(cross(up, localNormal));
        vec3 bitangent = cross(localNormal, tangent);
        
        // 2. Construct TBN matrix in LOCAL space (matches your sunDirection space)
        vTBN = mat3(tangent, bitangent, localNormal);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D dayTexture;
      uniform sampler2D nightTexture;
      uniform sampler2D bumpTexture;
      uniform vec3 sunDirection;
      uniform float bumpScale;
      
      varying vec2 vUv;
      varying mat3 vTBN;

      void main() {
        // --- BUMP MAPPING LOGIC ---
        // Adjust 1024.0 to match the actual resolution of your bump map (e.g., 2048.0 or 512.0)
        vec2 texelSize = vec2(1.0 / 1024.0, 1.0 / 1024.0);
        
        float h = texture2D(bumpTexture, vUv).r;
        float hX = texture2D(bumpTexture, vUv + vec2(texelSize.x, 0.0)).r;
        float hY = texture2D(bumpTexture, vUv + vec2(0.0, texelSize.y)).r;
        
        // Calculate the perturbed normal in tangent space.
        // FIX: Negate the gradients. If height increases in +X, the normal must tilt towards -X.
        vec3 tangentNormal = normalize(vec3(
          (h - hX) * bumpScale,
          (h - hY) * bumpScale,
          1.0
        ));
        
        // Transform tangent space normal to LOCAL space
        vec3 perturbedLocalNormal = normalize(vTBN * tangentNormal);

        // --- DAY / NIGHT LIGHTING ---
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);
        
        // Use the PERTURBED localNormal for the lighting calculation
        float intensity = -dot(perturbedLocalNormal, normalize(sunDirection));
        float blendFactor = smoothstep(-0.1, 0.2, intensity);
        
        vec4 finalColor = mix(nightColor, dayColor, blendFactor);
        gl_FragColor = finalColor;
      }
    `
  })

  sunDirectionUniform = dayNightMaterial.uniforms.sunDirection

  function generateGridPaths() {
    const paths = [];
    const LNG_DIVS = 64;
    const LAT_DIVS = 32;
    const STEP_LNG = 360 / LNG_DIVS;
    const STEP_LAT = 180 / LAT_DIVS;

    for (let i = 0; i <= LNG_DIVS; i++) {
      const lng = -180 + (i * STEP_LNG);
      const points = [];
      for (let lat = -90; lat <= 90; lat += 1) points.push([lat, lng]);

      const isPrimeMeridian = i === 32;
      const isDateLine = i === 0 || i === 64;

      paths.push({
        points,
        color: isPrimeMeridian ? 'rgba(255, 200, 50, 0.9)' :
          isDateLine ? 'rgba(255, 100, 100, 0.6)' :
            `rgba(255, 255, 255, 0.78)`,
        stroke: isPrimeMeridian ? 1.2 :
          isDateLine ? 0.8 :
            i % 8 == 0 ? 0.5 : 0.15
      });
    }

    for (let j = 0; j <= LAT_DIVS; j++) {
      const lat = -90 + (j * STEP_LAT);
      const points = [];
      for (let lng = -180; lng <= 180; lng += 2) points.push([lat, lng]);

      const isEquator = j === 16;

      paths.push({
        points,
        color: isEquator ? 'rgba(255, 200, 50, 0.9)' :
          'rgba(255, 255, 255, 0.88)',
        stroke: isEquator ? 1.2 : 0.15
      });
    }
    return paths;
  }

  function generateGridLabels() {
    const labels = [];
    const LNG_DIVS = 64;
    const LAT_DIVS = 32;
    const STEP_LNG = 360 / LNG_DIVS;
    const STEP_LAT = 180 / LAT_DIVS;

    for (let i = 0; i <= LNG_DIVS; i++) {
      const lng = -180 + (i * STEP_LNG);
      const octalLng = i.toString(8).padStart(2, '0');
      const isPrimeMeridian = i === 32;
      const isDateLine = i === 0 || i === 64;

      labels.push({
        lat: 0,
        lng: lng,
        text: octalLng,
        color: isPrimeMeridian ? 'rgba(255, 200, 50, 0.9)' :
          isDateLine ? 'rgba(255, 100, 100, 0.8)' :
            'rgba(255, 255, 255, 0.65)',
        size: 0.35,
        altitude: 0.015
      });
    }

    const targetLngIndices = [0, 32, 64];
    for (const i of targetLngIndices) {
      const lng = -180 + (i * STEP_LNG);
      for (let j = 0; j <= LAT_DIVS; j++) {
        if (j === 16) continue;
        const lat = -90 + (j * STEP_LAT);
        const octalLat = j.toString(8).padStart(2, '0');
        const isPole = j === 0 || j === 32;

        labels.push({
          lat: lat,
          lng: lng,
          text: octalLat,
          color: isPole ? 'rgba(255, 100, 100, 0.8)' :
            'rgba(255, 255, 255, 0.65)',
          size: 0.35,
          altitude: 0.015
        });
      }
    }
    return labels;
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
    .labelsData(generateGridLabels())
    .labelLat('lat')
    .labelLng('lng')
    .labelText('text')
    .labelColor('color')
    .labelSize('size')
    .labelAltitude('altitude')
    .labelIncludeDot(false)
    .labelResolution(4)
    .labelsTransitionDuration(0)
    .backgroundImageUrl(nightSky)
    .atmosphereColor('#3a228a')
    .atmosphereAltitude(0.1);

  // 4. Animation Loop
  const animate = () => {
    const dt = Date.now()
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