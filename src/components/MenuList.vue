<template>
  <div id="menuList">
    <div class="card bordered p-2" v-for="menu in menuFilterList" :key="menu.id">
      <div class="relative">
        <img class="rounded" :src="menu.menuImg">
        <span class="font-medium absolute bottom-0 left-0 rounded bg-primary p-1">{{ menu.price }} ฿</span>
      </div> 
      <div class="card-body">
        <h2 class="card-title">{{ menu.menuName }}
          <div class="badge mx-2 badge-secondary">NEW</div>
        </h2> 
        <p>&emsp;{{ menu.description }}</p> 
          <div class="justify-center card-actions">
            <button class="btn btn-secondary uppercase w-full text-base">Add to Cart</button>
          </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    cateId: null
  },
  data(){
    return {
      menuList:[],
    }
  },
  methods : {
  async getMenuList() {
      try {
        const res = await fetch("http://localhost:3000/menu");
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
        return list.category.cateId == this.cateId
      })
    }
  },
  async created() {
    this.menuList = await this.getMenuList();
  }
};
</script>