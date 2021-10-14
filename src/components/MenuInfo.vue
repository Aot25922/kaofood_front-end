<template>
  <div class="card lg:mt-28 md:mt-24 mt-20 md:mb-5 mb-3 p-2 md:flex md:flex-row">
    <div class="md:w-3/5 md:my-auto">
      <img :src="this.$store.state.backendUrl+this.menu.image" class="rounded-lg w-full"/>
    </div>
    <div class="md:w-2/5 md:px-1 lg:grid lg:grid-rows-2">
      <div class="card-body p-3">
        <h1 class="font-semibold md:text-2xl text-xl text-center py-2 card-title">{{ menu.name }}</h1>
        <h2 class="font-semibold text-left text-lg badge badge-success py-2 my-1">{{ menu.price }} ฿</h2>
        <p class="lg:mt-6 md:mt-4 mt-2 text-gray-dark md:text-base text-sm">&emsp;{{ menu.description }}</p>
      </div>
      <div class="justify-center card-actions flex flex-row md:px-5 lg:items-end">
        <button @click="addToCart" class="btn btn-secondary lg:text-base md:text-sm text-xs flex-1">Add to Cart</button>
        <router-link to="/menu" class="btn btn-accent lg:text-base md:text-sm text-xs flex-1">Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowMenu",
  data() {
    return {
      menu: {
        name: "",
        price: 0,
        description: "",
        category: null,
        image: ""
      }
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.menu)
    },
  },
  mounted() {
    if (this.$route.params.id == null) return;
    let tempMenu = this.$store.state.menus.filter(list => {
      return list.id == this.$route.params.id
    })
    this.menu = tempMenu[0];
  }
}
</script>