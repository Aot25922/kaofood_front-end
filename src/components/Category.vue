<template>
  <div id="category" class="navbar md:flex md:flex-row grid grid-cols-3 p-2">
    <!-- All Menu -->
    <button class="md:flex-1 text-black btn btn-accent btn-ghost xl:text-xl lg:text-lg md:text-base" @click="$emit('SelectCate', null)">
      All Menu
    </button>
    <!-- Category -->
    <button class="md:flex-1 text-black btn btn-accent btn-ghost xl:text-xl lg:text-lg md:text-base md:p-1" 
      v-for="category in categoryList" :key="category.id" @click="$emit('SelectCate', category.id)">
        <img class="w-6" v-bind:src="category.image"><span class="ml-1">{{ category.name }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Category",
  emits: ["SelectCate"],
  inject: ["categoryUrl"],
  data() {
    return {
      categoryList: [],
    };
  },
  methods: {
    async getCategory() {
      try{
      const res = await fetch(this.categoryUrl);
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