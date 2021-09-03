<template>
<div id="menuList">
  <h1 class="text-center xl:text-3xl lg:text-2xl md:text-xl text-lg xl:py-4 lg:py-3 py-2 font-semibold" >Our Menu</h1>
  <div class="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 sm:flex sm:flex-row">
    <div class="card p-2 sm:flex-1" v-for="menu in menuFilterList" :key="menu.id">
      <div class="relative">
        <img class="rounded w-full xl:h-80 h-56 object-cover" :src="menuUrl+menu.image">
        <span class="font-medium absolute bottom-0 left-0 rounded bg-primary md:text-2xl text-xl p-1">{{ menu.price }} ฿</span>
      </div> 
      <div class="card-body">
        <h2 class="card-title xl:text-2xl lg:text-xl md:text-lg text-base">{{ menu.name }}
          <!-- <div class="badge mx-2 badge-secondary lg:text-xl md:text-lg lg:py-4 md:p-3 ">NEW</div> -->
        </h2> 
        <!-- <p class="truncate">&emsp;{{ menu.description }}</p> -->
          <div class="justify-center card-actions">
            <button class="btn btn-secondary w-full uppercase xl:text-xl lg:text-lg md:text-base text-sm">Add to Cart</button>
          </div>
      </div>
    </div> 
  </div>
</div>
</template>

<script>
export default {
  name: "MenuList",
  props: {cateId: null},
  inject: ["menuUrl"],
  data(){
    return {
      menuList:[],
    }
  },
  methods : {
    async getMenuList() {
      try {
        const res = await fetch(this.menuUrl);
        const data = res.json();
        return data;
      } catch (error) {
        console.log(`Counld not get! ${error}`);
      }
    },
  },
  computed: {
    menuFilterList() {
      if(this.cateId == null) return this.menuList;
      return this.menuList.filter(list => {
        return list.category.id == this.cateId
      })
    }
  },
  async created() {
    this.menuList = await this.getMenuList();
  }
};
</script>