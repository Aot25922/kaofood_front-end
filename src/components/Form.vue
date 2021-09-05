<template>
  <div id="form">
      <!-- form กรอกข้อมูล เพิ่ม แก้ไข สำหรับ admin -->
      <form @submit.prevent="submitForm()" class="bg-fire-lighter">
        <div class="mt-4">
          <input v-model.trim="menuName" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Menu Name"/>
          <span v-if="!validateName" @blur="checkName" class="text-error">Name required</span>
        </div>
        <div class="mt-4">
          <select v-model="category" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Category"/>
          <span v-if="!validateCategory" @blur="checkCategory" class="text-error">Category required</span>
        </div>
        <div class="mt-4">
          <input v-model="price" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Price"/>
          <span v-if="!validatePrice" @blur="checkPrice" class="text-error">Price required</span>
        </div>
        <div class="mt-4">
          <input v-model="descript" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Description"/>
          <span v-if="!validateDescript" @blur="checkDescript" class="text-error">Description required</span>
        </div>
        <div class="mt-4">
          <img id="output" width="200">
          <input type="file" name="img" accept="image" id="file" @change="onFileChange($event)"/>
          <span v-if="!validateFile" class="text-error">Description required</span>
        </div>
        <div class="flex flex-row">
          <div class="btn">Save Form</div>
          <div class="btn btn-primary">Cancel</div>
        </div>
      </form>
  </div>
</template>

<script>
export default {
    name: "Form",
    props:{
      isEdit: Boolean,
      menuToEdit: null,
    },
    inject: [ "categoryUrl", "menuUrl", "userUrl" ],
    data(){
      return{
        menuName: "",
        menuList: [],
        price: "",
        img: "",
        file: null,
        descript: "",
        category: null,
        cateList: [],
        edit: this.isEdit,
        validateName: true,
        validatePrice: true,
        validateDescript: true,
        validateCategory: true
      }
    },
    methods:{
      submitform(){
        this.checkName();
        this.checkPrice();
        this.checkDescript();
        this.checkCategory();
        this.checkFile();
        if( this.validateName && this.validatePrice && this.validateDescript && this.validateCategory ){
          if(this.edit) {
            this.editMenu();
          } else {
            this.addproduct();
          }
        } else {
          return;
        }
      },
      checkName() {
      if (this.productName == "") {
        this.validateName = false;
      }
      else {
        for(let i =0 ; i<this.productList.length;i++){
          if(this.productName==this.productList[i].productName){
            if(!this.edit){
            this.validateName = false;
            return;
            }
          }
        }
        this.validateName = true;
        }
      },
      checkDescript() {
        if (this.descript == "") {
          this.validateDescript = false;
        } else {
          this.validateDescript = true;
        }
      },
      checkPrice() {
        if (this.price == "") {
          this.validatePrice = false;
        } else {
          this.validatePrice = true;
        }
      },
      checkCategory() {
        if (this.category == null) {
          this.validateCategory = false;
        } else {
          this.validateCategory = true;
        }
      },
      checkFile() {
        if ( this.file == null) {
          if(this.edit){
            this.validateFile = true;
            return;
          }
          this.validateFile = false;
        } else {
          this.validateFile = true;
        }
      },
      async getCategoryList(){
        try{
          const res = await fetch(this.categoryUrl);
          const data = res.json();
          return data;
        } catch(error) {
          console.log(`Counld not get! ${error}`);
        }
      },
      async getMenuList(){
        try{
          const res = await fetch(this.menuUrl);
          const data = res.json();
          return data;
        } catch(error) {
          console.log(`Counld not get! ${error}`);
        }
      },
      async addNewMenu(){
        let menu = JSON.stringify({
          menuName: this.menuName,
          price: this.price,
          descript: this.descript,
          img: this.img,
          category: this.category
        })
        let data = new FormData();
        data.append("menu", menu);
        data.append("multipathFile". this.file)
        try{
          await fetch(this.menuUrl, {
            method: "POST",
            body: data,
          });
        } catch(error){
          console.log(error)
        }
        this.cancel()
      },
      async editMenu(){
        let editOnlyImg;
        let menu = JSON.stringify({
          menuName: this.menuName,
          price: this.price,
          descript: this.descript,
          img: this.img,
          category: this.category
        })
        let data = new FormData();
        let editImg = new FormData();
        data.append("menu", menu)
        try {
        await fetch(
          `${this.menuUrl}/${this.productToEdit.productId}`,
          {
            method: "PUT",
            body: data,
          }
        );
      } catch (error) {
        console.log(error);
      }
      if (this.file !== null) {
        editImg.append("multipartFile", this.file);
        editOnlyImg=true;
        try {
          await fetch(
            `${this.productUrl}/image/${this.menuToEdit.menuId}`,
            {
              method: "PUT",
              body: editImg,
            }
          );
        } catch (error) {
          console.log(error);
        }
      } 
      this.$emit("reload-data",editOnlyImg);
      this.cancel();
    },
      
  }
}
</script>