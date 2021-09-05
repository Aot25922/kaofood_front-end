<template>
  <intro-concept class="mt-16"/>
  <about class="my-5"/>
  <!-- Home page: Category -->
  <div>

  </div>
</template>

<script>
import IntroConcept from '@/components/IntroConcept.vue'
import About from '@/components/About.vue'

export default {
  name: "Home",
  components: {IntroConcept, About},
  data() {
    return {
      cateId: null,
      menuList: []
    }
  },
}
</script>