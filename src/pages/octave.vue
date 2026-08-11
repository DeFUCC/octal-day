<script setup>

const days = Array(8).fill(null).map((_, i) => i)

</script>

<template lang="pug">
section.border-1.bg-dark-800.shadow-xl.flex-auto.gap-2.flex.flex-wrap.items-stretch.justify-stretch.overflow-hidden.my-2px.w-full.text-light-800.p-8
  .p-4.bg-dark-300.flex-1(v-for="day in days" :key="day" style="flex:42%") 
    .text-lg {{day}}

</template>


<style scoped>
.octave-grid {
  grid-template-columns: repeat(2, 1fr);
}
</style>