<template>
  <div>
    <category @SelectCate="selectCate" />
    <food-list :cateId="cateId" />
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import FoodList from "@/components/FoodList.vue";
export default {
  name: "Menu",
  components: { Category, FoodList },
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