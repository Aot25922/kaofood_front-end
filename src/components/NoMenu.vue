<template>
    <div class="flex-grow">
      <i class="fas fa-box-open xl:text-9xl md:text-7xl text-5xl p-5"></i>
      <p class="xl:p-5 md:p-3 p-2 text-gray xl:text-lg text-sm">{{ text }}</p>
      <router-link to="/menu" class="btn btn-secondary btn-sm rounded-2xl xl:text-lg xl:m-5 md:m-3 m-2">Choose your menu!</router-link>
    </div>
</template>

<script>
export default {
    name: "NoMenu",
    props:{
        text: String
    }
}
</script>