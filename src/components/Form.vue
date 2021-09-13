<template>
  <div id="form" class="lg:px-16 md:px-10 py-5 px-6">
      <form @submit.prevent="submitForm()" class="bg-salmon card p-5 md:my-5 md:grid md:grid-cols-2">
        <div class="mt-4 flex flex-col md:p-2">
          <label for="menuName" class="font-semibold text-lg pb-2">Menu name</label>
          <input v-model.trim="menu.name" class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray" placeholder="Menu Name"/>
          <span v-if="!validateName" @blur="checkName" class="text-error">Name required</span>
        </div>
        <div class="mt-4 flex flex-col md:p-2">
          <label for="category" class="font-semibold text-lg pb-2">Category</label>
          <select id="category" v-model="menu.category" name="category" class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray">
           <option value="" disabled select class="font-semibold">-- Please select one --</option>
           <option :value="category" v-for="category in this.$store.state.categories" :key="category.id">
                {{ category.name }}
           </option>
          </select>
          <span v-if="!validateCategory" @blur="checkCategory" class="text-error">Category required</span>
        </div>
        <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
          <label for="category" class="font-semibold text-lg pb-2">Price</label>
          <input v-model="menu.price" class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray md:w-1/2" placeholder="Price"/>
          <span v-if="!validatePrice" @blur="checkPrice" class="text-error">Price required</span>
        </div>
        <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
          <label for="description" class="font-semibold text-lg pb-2">Menu Description</label>
          <textarea v-model="menu.description" class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray" placeholder="Description"/>
          <span v-if="!validateDescript" @blur="checkDescript" class="text-error">Description required</span>
        </div>
        <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
          <img id="output" width="200">
          <input type="file" name="img" accept="image" id="file" @change="onFileChange($event)"/>
          <span v-if="!validateFile" class="text-error">Image required</span>
        </div>
        <div class="md:col-span-2 md:p-2 md:mr-0 flex flex-row mx-auto pt-5">
          <button type="submit" class="btn md:mx-5 mx-2">Save Form</button>
          <!-- TODO: Must v-if cancel of edit menu -->
          <button @click="reset" class="btn btn-primary md:mx-5 mx-2">Cancel</button>
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
        edit: this.isEdit,
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
        if (this.menu.price < 0 ) {
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
    }
  },
  mounted(){
    this.setFoodToEdit()
  },
  updated(){
    this.setFoodToEdit()
  }
}
</script>