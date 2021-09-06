<template>
  <div id="menu">
    <!--Option for edit menu to admin-->
    <div v-if="this.$store.state.account!=null" class="lg:flex-wrap flex flex-row mt-36">
      <router-link class="lg:w-1/3 lg:flex-none flex-1 m-1 btn btn-outline lg:text-xl md:text-lg" to="/menu/edit">Edit Menu</router-link>
      <router-link class="lg:w-1/3 lg:flex-none flex-1 m-1 btn btn-secondary lg:text-xl md:text-lg" to="/menu/add">Add Menu</router-link>
    </div>
    <!--FoodList with Loop-->
    <div v-else>
     <category @SelectCate="selectCate"/>
     <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold">Our Menu</h1>
     <div class="xl:grid-rows-none lg:grid lg:grid-cols-4 lg:grid-rows-3 md:grid md:grid-cols-2 md:grid-rows-2 sm:flex sm:flex-row">
      <food-list class="card p-2 sm:flex-1" v-for="menu in menuFilterList" :menu="menu" :key="menu.id"/>
    </div>
  </div>
  <router-view/>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import FoodList from "@/components/FoodList.vue";

export default {
  name: "Menu",
  components: {Category, FoodList},
  data() {
    return {
      cateId: null,
    };
  },
  methods: {
    selectCate(id) {
      this.cateId = id;
    },
  },
  computed: {
    menuFilterList() {
      if (this.cateId == null) return this.$store.state.menus;
      return this.$store.state.menus.filter(list => {
        return list.category.id == this.cateId
      })
    },
    account() {
      return this.$store.state.account;
    }
  },
  beforeCreate() {
    this.$store.dispatch("fetchCategoryAPI");
    this.$store.dispatch("fetchMenuAPI");
  }
};
</script>