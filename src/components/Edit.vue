<template>
  <div id="edit" >
    <edit-form v-if="showForm" :menuToEditProps="menu" @cancel-form = "showForm=false" />
    <div v-else>
   <category @SelectCate="selectCate"/>
     <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold">Our Menu</h1>
     <div class="xl:grid-rows-none lg:grid lg:grid-cols-4 lg:grid-rows-3 md:grid md:grid-cols-2 md:grid-rows-2 sm:flex sm:flex-row">
      <food-list  class="card p-2 sm:flex-1" v-for="inmenu in menuFilterList" :menu="inmenu" :key="inmenu.id"  @edit-food="showEditForm"/>
    </div>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import FoodList from "@/components/FoodList.vue";
import EditForm from "@/components/Form.vue";
export default {
  name: "MenuEdit",
  components: { Category, FoodList,EditForm },
  data() {
    return {
      cateId: null,
      showForm:false,
      menu : null,
    };
  },
  methods: {
        selectCate(id) {
      this.cateId = id;
    },
        showEditForm(menu){
       this.showForm = true;
       this.menu = menu
    }
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
    },
  },
  beforeCreate() {
    this.$store.dispatch("fetchMenuAPI");
  }
};
</script>