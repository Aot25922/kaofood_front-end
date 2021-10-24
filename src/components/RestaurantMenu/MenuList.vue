<template>
  <div id="MenuList" class="card bordered bg-white">
    <div class="relative">
      <router-link :to="{ name:'MenuInfo' , params: { id : menu.id } }">
        <img id="img-id" class="rounded w-full xl:h-80 h-56 object-cover"
           :src=" this.$store.state.backendUrl+this.menu.image" :alt="menu.name"/>
        <span class="font-medium absolute bottom-0 left-0 rounded bg-primary text-white xl:text-xl md:text-lg p-1">{{ menu.price }} ฿</span>
      </router-link>
    </div>
    <div class="card-body xl:p-8 lg:p-5 p-3">
      <h2 class="card-title xl:text-2xl md:text-xl">{{ menu.name }}
        <!-- <div class="badge mx-2 badge-secondary lg:text-xl md:text-lg lg:py-4 md:p-3 ">NEW</div> -->
      </h2>
      <div v-if="accountRole" class="flex flex-row">
        <router-link class="btn btn-warning lg:text-base text-sm mx-1 flex-1" :to="{ name:'EditMenu' , params: { id : menu.id } }">Edit</router-link>
        <button class="btn btn-error lg:text-base text-sm mx-1 flex-1" @click="deleteMenu(menu)">Delete</button>
      </div>
      <div v-else class="justify-center card-actions">
        <button @click="addToCart" class="btn btn-secondary lg:text-base md:text-sm text-xs w-full">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    menu: null,
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.menu)
      console.log(this.menu)
    },
    async deleteMenu(menu) {
      const axios = require('axios');
      var result = confirm(`Want to delete ${menu.name}?`);
      if (result) {
        await axios.delete(`${this.$store.state.backendUrl}/menu/delete/${menu.id}`,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
        await this.$store.dispatch('fetchMenuAPI');
      }
    },
  },
  computed: {
    accountRole() {
      if(this.$store.state.account==null) return false;
      if(this.$store.state.account.role=='Admin') return true;
      if(this.$store.state.account.role=='Staff') return true;
      return false;
    },
  },
};
</script>