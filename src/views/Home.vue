<template>
    <intro-concept />
    <category/>
    <menu-list/>
</template>

<script>
import IntroConcept from '@/components/IntroConcept.vue'
import Category from '@/components/Category.vue'
import MenuList from '@/components/MenuList.vue'
export default {
    name: "Home",
    components: { IntroConcept, Category, MenuList },
    data() {
        return {
            cateId: null,
            menuList: []
        }
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
    selectCate(id){
      this.cateId = id;
    }
  },
}
</script>