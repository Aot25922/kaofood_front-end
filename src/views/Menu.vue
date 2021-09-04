<template>
  <div id="menu">
    <div v-if="account()!=null&&account().role=='Admin'">
       <category @SelectCate="selectCate"/>
       <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold" >Menus</h1>
       <div class="lg:flex-wrap flex flex-row">
        <router-link class="lg:w-1/3 lg:flex-none flex-1 m-1 btn btn-outline lg:text-xl md:text-lg" to="/menu/edit">Edit Menu</router-link>
        <router-link class="lg:w-1/3 lg:flex-none flex-1 m-1 btn btn-secondary lg:text-xl md:text-lg" to="/menu/add">Add Menu</router-link>
       </div>
       <food-list :cateId="cateId"/>
    </div>
    <div v-else> 
       <category @SelectCate="selectCate"/>
       <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold" >Our Menus</h1>
       <food-list :cateId="cateId"/>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import FoodList from "@/components/FoodList.vue";
export default {
  name: "Menu",
  components: { Category, FoodList },
  inject : ["account"],
   data() {
    return {
      cateId : null,
    };
  },
  methods: {
  async getFoodList() {
    try {
      const res = await fetch(this.menuUrl);
      const data = res.json();
      return data;
    } catch (error) {
      console.log(`Counld not get! ${error}`);
    }
  },
  selectCate(id) {
    this.cateId = id;
  },
},
};
</script>