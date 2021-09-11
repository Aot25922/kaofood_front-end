<template>
  <div id="category" class="navbar md:flex md:flex-row grid grid-cols-3">
    <!-- All Menu -->
    <button class="bordered focus:bg-base-300 md:flex-1 text-black btn btn-accent btn-ghost m-1 xl:text-lg lg:text-base md:text-sm text-xs" @click="$emit('SelectCate', null)">
      All Menu
    </button>
    <!-- Category -->
    <button
        class="bordered focus:bg-base-300 m-1 md:flex-1 flex flex-wrap text-black btn btn-accent btn-ghost xl:text-lg lg:text-base md:text-sm text-xs md:p-0 p-2"
        v-for="category in categoryList" :key="category.id" @click="$emit('SelectCate', category.id)">
      <img class="lg:w-11 md:w-9 w-7" v-bind:src="category.image"><span class="ml-1 w-1/2">{{ category.name }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Category",
  emits: ["SelectCate"],
  computed: {
    categoryList() {
      return this.$store.state.categories;
    }
  },
  beforeCreate() {
    this.$store.dispatch("fetchCategoryAPI");
  }
};
</script>