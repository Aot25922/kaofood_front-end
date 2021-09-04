<template>
  <div id="menu">
    <category @SelectCate="selectCate"/>

    <!--FoodList with Loop-->
    <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold">Our Menu</h1>
    <div class="xl:grid-rows-none lg:grid lg:grid-cols-4 lg:grid-rows-3 md:grid md:grid-cols-2 md:grid-rows-2 sm:flex sm:flex-row">
      <food-list class="card p-2 sm:flex-1" v-for="menu in menuFilterList" :menu="menu" :key="menu.id"/>
    </div>
    <!--    <div class="mt-32" v-if="account()!=null&&account().role=='Admin'">-->
    <!--       <router-link to="/menu/edit">Edit</router-link>-->
    <!--       <router-link to="/menu/add">Add</router-link>-->
    <!--       <router-view />-->
    <!--    </div>-->
    <!--    <div v-else> -->
    <!--       -->
    <!--       <food-list :cateId="cateId"/>-->
    <!--    </div>-->
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
    }
  },
  mounted() {
    this.$store.dispatch("fetchMenu");
  }
};
</script>