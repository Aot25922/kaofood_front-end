<template>
  <div id="app">
    <menu-bar />
    <intro-concept />
    <AccountPopup />
    <Footer />
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue'
import IntroConcept from '@/components/IntroConcept.vue'
import Footer from '@/components/Footer.vue'
import AccountPopup from '@/components/AccountPopup.vue'
export default {
  components: { MenuBar, IntroConcept, Footer, AccountPopup},
};
</script>