<template>
  <div id="introConcept">
    <div class="text-center relative text-white">
      <img src="../assets/header.jpg" alt="Header image" class="filter brightness-50 md:w-full md:h-full h-96 md:object-none object-cover" />
      <div class="font-medium absolute transform inset-0 top-1/4">
        <p class="xl:text-8xl lg:text-6xl md:text-4xl text-xl font-bold uppercase">Kaofood Restaurant</p>
        <p>{{account}}</p>
        <p class="xl:text-2xl lg:text-lg md:text-base text-2xs xl:my-10 lg:my-6 md:my-5 my-4 md:px-10 px-5">If you're hungry that's your business not us. We have many menus but we don't have "Anything will do".</p>
        <router-link to="/menu" class="mt-5 btn btn-accent lg:btn-lg md:btn-md btn-sm xl:text-2xl lg:text-lg md:text-base text-xs">Let's Eat!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroConcept",
};
</script>
