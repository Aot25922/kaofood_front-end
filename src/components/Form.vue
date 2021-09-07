<template>
  <div id="form" class="p-5">
      <form @submit.prevent="submitForm()" class="bg-salmon card p-5">
        <div class="mt-4 flex flex-col">
          <label for="menuName" class="font-semibold">Menu name</label>
          <input v-model.trim="menu.name" class="h-12 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray-600" placeholder="Menu Name"/>
          <span v-if="!validateName" @blur="checkName" class="text-error">Name required</span>
        </div>
        <div class="mt-4">
          <label for="category" class="font-semibold">Category</label>
          <select id="category" v-model="menu.category" name="category">
           <option value="" disabled select>Please select one</option>
           <option :value="category" v-for="category in this.$store.state.categories" :key="category.id">
                {{ category.name }}
           </option>
          </select>
          <span v-if="!validateCategory" @blur="checkCategory" class="text-error">Category required</span>
        </div>
        <div class="mt-4">
          <input v-model="menu.price" class="h-12 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray-600" placeholder="Price"/>
          <span v-if="!validatePrice" @blur="checkPrice" class="text-error">Price required</span>
        </div>
        <div class="mt-4">
          <textarea v-model="menu.description" class="h-12 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray-600" placeholder="Description"/>
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
          if(this.menuToEditProps!=null) {
            this.editMenu();
          } else {
            this.addNewMenu();
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
      setFoodToEdit(){
      if(this.menuToEditProps!=null){
        this.menu = this.menuToEditProps
         const image = document.getElementById("output")
         image.src = this.$store.state.backendUrl+this.menuToEditProps.image
      }
      else{
        console.log(this.$store.state.categories)
          }
      },
      async addNewMenu(){
         const axios = require('axios');
         let newMenu = JSON.stringify(this.menu)
         let data = new FormData()
         data.append("menu",newMenu)
         data.append("multipartFile", this.file);
         let config = {
             headers: {
                   "Access-Control-Allow-Origin":"*",
                },
           }
         try{
           await axios.post(`${this.$store.state.backendUrl}/menu/add`,data,config)
         }catch(error){
            console.log(`Counld not get! ${error}`);
          }
      },
      onFileChange(event) {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      this.file = event.target.files[0];
    },
    //   async getCategoryList(){
    //     try{
    //       const res = await fetch(this.categoryUrl);
    //       const data = res.json();
    //       return data;
    //     } catch(error) {
    //       console.log(`Counld not get! ${error}`);
    //     }
    //   },
    //   async getMenuList(){
    //     try{
    //       const res = await fetch(this.menuUrl);
    //       const data = res.json();
    //       return data;
    //     } catch(error) {
    //       console.log(`Counld not get! ${error}`);
    //     }
    //   },
    //   async addNewMenu(){
    //     let menu = JSON.stringify({
    //       menuName: this.menuName,
    //       price: this.price,
    //       descript: this.descript,
    //       img: this.img,
    //       category: this.category
    //     })
    //     let data = new FormData();
    //     data.append("menu", menu);
    //     data.append("multipathFile". this.file)
    //     try{
    //       await fetch(this.menuUrl, {
    //         method: "POST",
    //         body: data,
    //       });
    //     } catch(error){
    //       console.log(error)
    //     }
    //     this.cancel()
    //   },
    //   async editMenu(){
    //     let editOnlyImg;
    //     let menu = JSON.stringify({
    //       menuName: this.menuName,
    //       price: this.price,
    //       descript: this.descript,
    //       img: this.img,
    //       category: this.category
    //     })
    //     let data = new FormData();
    //     let editImg = new FormData();
    //     data.append("menu", menu)
    //     try {
    //     await fetch(
    //       `${this.menuUrl}/${this.productToEdit.productId}`,
    //       {
    //         method: "PUT",
    //         body: data,
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   if (this.file !== null) {
    //     editImg.append("multipartFile", this.file);
    //     editOnlyImg=true;
    //     try {
    //       await fetch(
    //         `${this.productUrl}/image/${this.menuToEdit.menuId}`,
    //         {
    //           method: "PUT",
    //           body: editImg,
    //         }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   } 
    //   this.$emit("reload-data",editOnlyImg);
    //   this.cancel();
    // },
      
  },
  mounted(){
    this.setFoodToEdit()
},
updated(){
    this.setFoodToEdit()
}
}
</script>