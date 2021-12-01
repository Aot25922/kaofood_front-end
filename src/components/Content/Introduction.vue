<template>
  <div class="text-center relative text-white img">
      <img src="@/assets/introduction.jpg" class="filter brightness-50 w-full h-full object-top object-cover">
      <div class="absolute transform space-y-2 flex flex-col items-center w-full top-1/2 -translate-y-1/2 h-auto">
        <h2 class="font-bold tracking-wider font-writing text-fire-lighter xl:text-6xl lg:text-5xl md:text-4xl text-3xl">{{ intro }}</h2>
        <h1 class="font-bold tracking-widest uppercase xl:py-2 xl:text-5xl lg:text-4xl md:text-3xl text-2xl">{{ header }}</h1>
        <div class="divide-x tracking-wide divide-white">
      <router-link to="/" class="p-2">Home</router-link>
      <span class="text-fire-lighter p-2">{{ msg }}</span>
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

<style scoped>
  .img{
    height: 66vh;
  }
  @media (max-width: 1024px){
    .img{
      height: 40vh;
    }
  }
</style>