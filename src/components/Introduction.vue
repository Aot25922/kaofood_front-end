<template>
  <div class="text-center relative text-white md:pt-3 pt-16 h-2/3">
      <img src="@/assets/introduction.jpg" class="filter brightness-50 w-full h-full object-top object-cover">
      <div class="absolute transform inset-0 xl:top-52 top-1/2">
      <h2 class="font-bold font-writing text-fire-lighter xl:text-5xl lg:text-4xl md:text-3xl text-2xl">{{ intro }}</h2>
      <h1 class="font-bold uppercase xl:py-2 xl:text-6xl lg:text-4xl md:text-3xl text-2xl">{{ header }}</h1>
      <div class="divide-x divide-white">
      <router-link to="/" class="p-2 text-2xs">Home</router-link>
      <span class="text-fire-lighter p-2 text-2xs">{{ msg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Introduction',
    props: {
        intro: String,
        header: String,
        msg: String
    }
}
</script>