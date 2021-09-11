<template>
  <div id="menu">
    <!-- !!In pc screen order should have 3 cols not 4cols in admin -->
    <!--Option for edit menu to admin-->
    <div v-if="this.$store.state.account!=null" class="md:mt-24 mt-20">
      <div class="flex flex-row">
        <router-link class="flex-1 m-1 btn btn-ghost  lg:text-xl md:text-lg " to="/menu/edit">Edit Menu</router-link>
        <router-link class="flex-1 m-1 btn btn-ghost lg:text-xl md:text-lg" to="/menu/add">Add Menu</router-link>
      </div>
    </div>
    <!--FoodList with Loop-->
    <div v-else>
     <category @SelectCate="selectCate" class="lg:mt-24 md:mt-20 mt-16"/>
     <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold">Our Menu</h1>
     <div class="xl:grid-rows-none lg:grid lg:grid-cols-3 lg:grid-rows-3 md:px-6 px-3 md:grid md:grid-cols-2 md:grid-rows-2 sm:flex sm:flex-row">
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