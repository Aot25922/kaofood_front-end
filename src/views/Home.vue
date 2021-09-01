<template>
    <img-home-header />
    <home-cate />
</template>

<script>
import ImgHomeHeader from '@/components/ImgHomeHeader.vue'
import HomeCate from '@/components/HomeCate.vue'
export default {
    name: "Home",
    components: { ImgHomeHeader, HomeCate },
    data() {
        return {
            cateId: null,
            menuList: []
        }
    },
}
</script>