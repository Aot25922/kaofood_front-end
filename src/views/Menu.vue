<template>
  <div id="menu" class="bg-salmon-light">
    <!--FoodList with Loop-->
    <category @SelectCate="selectCate" class="lg:mt-24 md:mt-20 mt-16"/>
    <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold">Our Menu</h1>
    <VSPagination class=""/>
    <div class="xl:grid-rows-none lg:grid lg:grid-cols-3 lg:grid-rows-3 md:px-6 px-3 md:grid md:grid-cols-2 md:grid-rows-2 sm:flex sm:flex-row">
      <router-link to="/menu/add" v-if="this.$store.state.account!=null && this.$store.state.account.role!='Member'" class="md:m-3 md:px-1">
        <!-- Appear when Phone and hiiden un Ipad -->
        <div class="md:hidden btn btn-accent uppercase w-full">Add New Menu</div>
        <!-- Appear when Ipad to laptop -->
        <i class="fas fa-plus-circle addMenuCard"></i>
      </router-link>
      <food-list class="card p-2 sm:flex-1 md:mx-3 m-2 md:mb-5" v-for="menu in menuFilterList" :menu="menu" :key="menu.id"/>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import FoodList from "@/components/FoodList.vue";
import VSPagination from "@/components/VSPagination.vue";

export default {
  name: "Menu",
  components: {Category, FoodList, VSPagination},
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
    }
  },
  beforeCreate() {
    this.$store.dispatch("fetchCategoryAPI");
    this.$store.dispatch("fetchMenuAPI");
  }
};
</script>