<template>
  <div id="add">
    <AddForm />
  </div>
</template>

<script>
import AddForm from '@/components/Form.vue'
export default {
    name: "Add",
    props: ['menu'],
    components: { AddForm },
    methods: {
      addNewMenu(){
        this.$store.dispatch('addMenu', this.menu)
        console.log(this.$store.state.menu)
      }
    },
}
</script>