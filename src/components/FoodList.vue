<template>
  <div id="FoodList" class="md:mx-3">
      <div class="relative">
        <img id ="img-id" class="rounded w-full xl:h-80 h-56 object-cover" :src=" this.$store.state.backendUrl+this.menu.image"/>
        <span class="font-medium absolute bottom-0 left-0 rounded bg-primary text-white md:text-2xl text-xl p-1">{{ menu.price }} ฿</span>
      </div>
      <div class="card-body xl:p-8 lg:p-5">
        <h2 class="card-title xl:text-xl lg:text-lg">{{ menu.name }}
          <!-- <div class="badge mx-2 badge-secondary lg:text-xl md:text-lg lg:py-4 md:p-3 ">NEW</div> -->
        </h2>
        <div v-if="account!=null&&account.role=='Admin'" class="flex flex-row">
          <button class="btn btn-warning lg:text-base text-sm mx-1 flex-1" @click="$emit('edit-food', menu)">Edit</button>
          <button class="btn btn-error lg:text-base text-sm mx-1 flex-1" @click="deleteMenu(menu)">Delete</button>
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
  props: {
    menu : null,
  },
  emits: ['edit-food'],
  data(){
    return {
      i:0
    }
  } ,
  methods: {
    addToCart(){
      this.$store.dispatch('addToCart',this.menu)
    },
    async deleteMenu(menu){
      const axios = require('axios');
      var result = confirm("Want to delete?"+menu.name);
       if (result) {
         this.$store.commit('DELETE_MENU', menu.id)
      try{
        await axios.delete(`${this.$store.state.backendUrl}/menu/delete/${menu.id}`)
      } catch(error){
            console.log(`Counld not get! ${error}`);  
      }
}
      
    },
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  
  
};
</script>