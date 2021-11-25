<template>
  <Introduction intro="Choose Your Items" header="Our Menu" msg="Menu" />
  <div id="menu" class="bg-salmon-light">
    <!--FoodList with Loop-->
    <category @SelectCate="selectCate" class="py-2" />
    <!-- <jw-pagination :items="menu" @changePage="onChangePage"></jw-pagination> -->
    <div class="xl:grid-rows-none lg:grid lg:grid-cols-3 lg:grid-rows-3 md:px-6 px-3 md:grid md:grid-cols-2 md:grid-rows-2 sm:flex sm:flex-row">
      <router-link to="/menu/add" v-if="this.$store.state.account!=null && this.$store.state.account.role.name!='Member'" class="md:m-3 md:px-1">
        <!-- Appear when Phone and hiiden un Ipad -->
        <div class="md:hidden btn btn-accent uppercase w-full">Add New Menu</div>
        <!-- Appear when Ipad to laptop -->
        <i class="fas fa-plus-circle addMenuCard"></i>
      </router-link>
      <menu-list class="card p-2 sm:flex-1 md:mx-3 m-2 md:mb-5" v-for="menu in menuFilterList" :menu="menu" :key="menu.id"/>
    </div>
  </div>
</template>

<script>
import Category from "@/components/RestaurantMenu/Category.vue";
import MenuList from "@/components/RestaurantMenu/MenuList.vue";
import Introduction from '@/components/Content/Introduction.vue';

export default {
  name: "Menu",
  components: { Category, MenuList, Introduction },
  data() {
    return {
      cateId: null,
      pageOfItems: []
    };
  },
  methods: {
    selectCate(id) {
      this.cateId = id;
    },
  },
  computed: {
    menuFilterList() {
      if (this.$store.state.search) return this.$store.state.menus.filter(list => {
        list = list.name.toLowerCase()
        return list.indexOf(this.$store.state.search.toLowerCase()) > -1
      })
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