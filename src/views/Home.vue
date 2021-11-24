<template>
  <div class="text-center relative text-white md:pt-3 pt-16">
    <img src="../assets/header.jpg" alt="Header image" class="filter brightness-50 md:w-full md:h-full h-96 md:object-none object-cover" />
    <div class="absolute transform inset-0 top-1/3">
      <p class="lg:text-6xl md:text-4xl text-2xl font-bold uppercase">Kaofood Restaurant</p>
      <p class="xl:text-2xl lg:text-lg md:text-base text-2xs xl:my-16 lg:my-10 my-5 md:px-10 px-5 font-medium">If you're hungry that's your business not us. We have many menus but we don't have "Anything will do".</p>
      <router-link to="/menu" class="btn btn-accent lg:btn-lg md:btn-md btn-sm xl:text-xl lg:text-lg md:text-base text-xs">Let's Eat!</router-link>
    </div>
  </div>
  <WhyWeAre class="my-5"/>
</template>

<script>
import WhyWeAre from '@/components/Content/WhyWeAre.vue'

export default {
  name: "Home",
  components: {WhyWeAre},
}
</script>