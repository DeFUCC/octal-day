<script setup>
</script>

<template lang="pug">
main.h-100svh.flex.flex-col.items-center.text-light-400
  .flex.w-full
    .flex.flex-row.gap-2.bg-dark-600.p-4.justify-between.items-center.flex-auto.flex-wrap
      RouterLink.text-2xl.font-bold(to="/") Octal Day
      nav.flex.flex-wrap.gap-2
        
        //- RouterLink(to="/derivation") Derivation
        //- RouterLink(to="/day") Day
        RouterLink(to="/time") Time
        RouterLink(to="/Petal") Petal
        RouterLink(to="/octave") Octave
        RouterLink(to="/earth") Earth
        RouterLink(to="/moon") Moon
        //- RouterLink(to="/venus") Venus
  
  router-view(v-slot="{ Component }")
    transition(name="fade", mode="out-in")
      keep-alive(:max="10")
        component(:is="Component")
</template>

<style lang="postcss">
a:hover {
  @apply underline;
}

a.router-active {
  @apply text-red;
}

body,
html {

  background-color: #222;
}

/* FADE */

.fade {
  transition: all 0.5s ease;
}

.fade-enter-active {
  transition: all 0.2s ease;
}

.fade-leave-active {
  opacity: 0;
  transition: all 0.1s ease;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>