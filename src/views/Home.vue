<template>
    <intro-concept />
    <show-menu/>
</template>

<script>
import IntroConcept from '@/components/IntroConcept.vue'
import ShowMenu from '../components/ShowMenu.vue'
export default {
    name: "Home",
    components: { IntroConcept, ShowMenu },
}
</script>