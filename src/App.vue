<template>
  <div id="app">
    <menu-bar />
    <intro-concept />
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import IntroConcept from '@/components/IntroConcept.vue'
export default {
  components: { MenuBar, IntroConcept },
};
</script>