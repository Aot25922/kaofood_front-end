<template>
  <div id="menu">
    <category/>
    <food-list/>
  </div>
</template>

<script>
import Category from '@/components/Category.vue'
import FoodList from '@/components/FoodList.vue'
export default {
    name: "Menu",
    components: { Category, FoodList },
    methods: {
    async getMenuList() {
      try {
        const res = await fetch(this.menuUrl);
        const data = res.json();
        return data;
      } catch (error) {
        console.log(`Counld not get! ${error}`);
      }
    },
    selectCate(id){
      this.cateId = id;
    }
  },
}
</script>