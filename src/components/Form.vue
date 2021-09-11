<template>
  <div id="form">
      <!-- form กรอกข้อมูล เพิ่ม แก้ไข สำหรับ admin -->
      <form @submit.prevent="submitform()" class="bg-fire-lighter">
        <div class="mt-4">
          <input v-model.trim="menu.name" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Menu Name"/>
          <span v-if="!validateName" @blur="checkName" class="text-error">Name required</span>
        </div>
        <div class="mt-4">
          <select id="category" v-model="menu.category" name="category" >
           <option disabled value="">Please select one</option>
           <option :value="category" v-for="category in this.$store.state.categories" :key="category.id">
                {{category.name }}
           </option>
          </select>
          <span v-if="!validateCategory" @blur="checkCategory" class="text-error">Category required</span>
        </div>
        <div class="mt-4">
          <input v-model="menu.price" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Price"/>
          <span v-if="!validatePrice" @blur="checkPrice" class="text-error">Price required</span>
        </div>
        <div class="mt-4">
          <input v-model="menu.description" class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600" placeholder="Description"/>
          <span v-if="!validateDescript" @blur="checkDescript" class="text-error">Description required</span>
        </div>
        <div class="mt-4">
          <img id="output" width="200">
          <input type="file" name="img" accept="image" id="file" @change="onFileChange($event)"/>
          <span v-if="!validateFile" class="text-error">Picture required</span>
        </div>
        <div class="flex flex-row">
          <div class="btn"><button>Save Form</button></div>
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
      menuToEditProps: null,
    },
    inject: [],
    data(){
      return{
        menu : {
           name : "",
           price : 0,
           description : "",
           category : null,
           image : ""
        },
        file: null,
        validateName: true,
        validatePrice: true,
        validateDescript: true,
        validateCategory: true,
        validateFile : true
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
          if(this.menuToEditProps!=null) {
            this.editMenu();
            this.reset();
          } else {
            this.addNewMenu();
            this.reset();
          }
         } else {
           return;
         }
      },
      reset(){
         this.menu.name = ""
         this.menu.price = 0
         this.menu.description = ""
         this.menu.category = null
         this.menu.image = ""
      },
      checkName() {
      if (this.menu.name == "") {
        this.validateName = false;
      }
      else {
        this.$store.state.menus.find(element => {if(element.name == this.menu.name){
          this.validateName = false;
        }else{
          this.validateName = true;
        }})
        }
      },
      checkDescript() {
        if (this.menu.description == "") {
          this.validateDescript = false;
        } else {
          this.validateDescript = true;
        }
      },
      checkPrice() {
        if (this.menu.price == "") {
          this.validatePrice = false;
        } else {
          this.validatePrice = true;
        }
      },
      checkCategory() {
        if (this.menu.category == null) {
          this.validateCategory = false;
        } else {
          this.validateCategory = true;
        }
      },
      checkFile() {
        if ( this.file == null) {
          this.validateFile = false;
        } else {
          this.validateFile = true;
        }
      },
      setFoodToEdit(){
      if(this.menuToEditProps!=null){
        this.menu = this.menuToEditProps
         const image = document.getElementById("output")
         image.src = this.$store.state.backendUrl+this.menuToEditProps.image
      }
      },
      async addNewMenu(){
         const axios = require('axios');
         let newMenu = JSON.stringify(this.menu)
         let data = new FormData()
         data.append("menu",newMenu)
         data.append("multipartFile", this.file);
//          let config = {
//              headers: {
//                   'Access-Control-Allow-Origin': 'http://localhost:80',
// 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
// 'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
// 'Access-Control-Max-Age': '86400',
// 'Access-Control-Allow-Credentials': 'true'
//                 },
//            }
         try{
           await axios.post(`${this.$store.state.backendUrl}menu/add`,data)
         }catch(error){
            console.log(`Counld not get! ${error}`);
          }
      },
      onFileChange(event) {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      this.file = event.target.files[0];
    },
  },
  mounted(){
    this.setFoodToEdit()
},
updated(){
    this.setFoodToEdit()
}
}
</script>