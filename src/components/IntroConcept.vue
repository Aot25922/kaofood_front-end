<template>
  <div id="introConcept">
    <div class="text-center relative text-white">
      <img src="../assets/header.jpg" alt="Header image" class="filter brightness-50 md:w-full md:h-full h-96 md:object-none object-cover" />
      <div class="font-medium absolute transform inset-0 top-1/4">
        <p class="xl:text-8xl md:text-5xl sm:text-4xl text-2xl font-bold uppercase">Kaofood Restaurant</p>
        <p>{{account}}</p>
        <p class="xl:text-3xl md:text-2xl sm:text-base text-xs xl:my-10 sm:mt-5 mt-1 md:px-5 px-2">If you're hungry that's your business not us. We have many menus but we don't have "Anything will do".</p>
        <router-link to="/menu" class="mt-5 btn btn-accent md:btn-lg sm:btn-md btn-sm xl:text-3xl md:text-2xl sm:text-lg text-xs">Let's Eat!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroConcept",
};
</script>
