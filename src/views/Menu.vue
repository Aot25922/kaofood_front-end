<template>
  <div id="menu">
    <div class="mt-32" v-if="account()!=null&&account().role=='Admin'">
       <router-link to="/menu/edit">Edit</router-link>
       <router-link to="/menu/add">Add</router-link>
       <router-view />
    </div>
    <div v-else> 
       <category @SelectCate="selectCate"/>
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