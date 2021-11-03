<template>
    <div class="text-center mx-auto text-yellow font-bold">
        <i class="fas fa-exclamation-circle p-3 md:text-6xl text-5xl text-warning"></i> 
        <p class="lg:text-xl md:text-lg p-3 text-warning">You want to get in This page?</p>
        <img :src="require(`@/assets/${image}`)" :class="css">
        <p class="lg:text-xl md:text-lg p-3 text-error">{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'ErrorPage',
    props: {
        css: String,
        msg: String,
        image: String
    }
}
</script>