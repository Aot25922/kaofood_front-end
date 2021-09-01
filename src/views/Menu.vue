<template>
  <div id="menu">
    <category @SelectCate="selectCate" />
    <menu-list :cateId="cateId"/>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
import MenuList from "@/components/MenuList.vue";
export default {
  name: "Menu",
  components: { Category, MenuList },
   data() {
    return {
      cateId : null,
    };
  },
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
  selectCate(id) {
    this.cateId = id;
  },
},
};
</script>