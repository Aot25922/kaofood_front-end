<template>
  <div id="category" class="navbar flex flex-row p-2">
    <!-- All Menu -->
    <button class="flex-1 text-black btn btn-accent btn-ghost" v-on:click="$emit('SelectCate',null)">
      All Menu
    </button>
    <!-- Category -->
    <button class="flex-1 text-black btn btn-accent btn-ghost" v-for="category in categoryList" :key="category.menuId" v-on:click="$emit('SelectCate', category.cateId)">
        <img class="w-6" v-bind:src="category.cateImg"> <span class="ml-1">{{ category.cate }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Category",
  emits: ["SelectCate"],
  data() {
    return {
      categoryList: [],
    };
  },
  methods: {
    async getCategory() {
      try{
      const res = await fetch("http://localhost:3000/menu");
      const data = await res.json();
      return data;
      } catch (error) { 
          console.log(`Could not get! ${error}`)
        }
    },
  },
  async created() {
    this.categoryList = await this.getCategory();
  },
};
</script>