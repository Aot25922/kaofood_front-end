<template>
  <div id="FoodList">
      <div class="relative">
        <img class="rounded w-full xl:h-80 h-56 object-cover" :src="this.$store.state.backendUrl+menu.image">
        <span class="font-medium absolute bottom-0 left-0 rounded bg-primary md:text-2xl text-xl p-1">{{ menu.price }} ฿</span>
      </div>
      <div class="card-body xl:p-8 lg:p-5">
        <h2 class="card-title mb-5 xl:text-xl lg:text-lg">{{ menu.name }}
          <!-- <div class="badge mx-2 badge-secondary lg:text-xl md:text-lg lg:py-4 md:p-3 ">NEW</div> -->
        </h2>
        <!-- <p class="truncate">&emsp;{{ menu.description }}</p> -->
        <div v-if="account!=null&&account.role=='Admin'" class="flex flex-row">
          <button class="btn btn-warning lg:text-base text-sm mx-1 flex-1">Edit</button>
          <button class="btn btn-error lg:text-base text-sm mx-1 flex-1">Delete</button>
        </div>
        <div class="justify-center card-actions" v-else>
          <button @click="addToCart" class="btn btn-secondary w-full uppercase xl:text-xl lg:text-lg md:text-base text-sm">Add to Cart
          </button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "FoodList",
  props: ['menu'],
  methods: {
    addToCart(){
      this.$store.dispatch('addToCart',this.menu)
      console.log(this.$store.state.cart);
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  }
};
</script>