<template>
  <div id="app" class="select-none h-screen">
    <menu-bar />
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: { MenuBar, Footer },
  beforeCreate() {
    this.$store.dispatch("fetchLocalStorage");
  }
};
</script>

<style>
/* Writing style font */
@import url('https://fonts.googleapis.com/css2?family=Allison&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
</style>