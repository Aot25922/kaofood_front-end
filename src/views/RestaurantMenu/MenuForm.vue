<template>
  <div id="form" class="lg:px-16 md:px-10 py-5 px-6 alert alert-warning flex-grow">
    <!-- No permission display -->
    <div v-if="account==null||this.$store.state.account.role.name=='Member'||this.error==true" class=" lg:mt-28 md:mt-24 mt-20 w-full">
      <ErrorPage msg="No no no, That isn't any pokemon here." image="pikachu.gif" css="rounded-md my-5"></ErrorPage>
    </div>

    <form v-else @submit.prevent="submitform()" class="bg-salmon w-full text-black card p-5 my-5 md:grid md:grid-cols-2">
      <div class="mt-4 flex flex-col md:p-2">
        <label for="menuName" class="font-semibold text-lg pb-2 label-text">Menu name</label>
        <input v-model.trim="form.name" autofocus
               class="py-3 px-2 w-full input"
               placeholder="Please enter Menu name..."/>
        <span v-if="!validateName" @blur="checkName" class="text-error">Name required</span>
      </div>
      <div class="mt-4 flex flex-col md:p-2">
        <label for="category" class="font-semibold text-lg pb-2 label-text">Category</label>
        <select id="category" v-model="form.category" name="category"
                class="py-3 px-2 w-full select">
          <option value="" disabled="" selected="" class="font-semibold">-- Please select one --</option>
          <option :value="category" v-for="category in this.$store.state.categories" :key="category.id">{{ category.name }}</option>
        </select>
        <span v-if="!validateCategory" @blur="checkCategory" class="text-error">Category required</span>
      </div>
      <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
        <label for="category" class="font-semibold text-lg pb-2 label-text">Price</label>
        <input v-model="form.price"
               class="py-3 px-2 w-full input md:w-1/2"
               placeholder="Price"/>
        <span v-if="!validatePrice" @blur="checkPrice" class="text-error">Price required</span>
      </div>
      <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
        <label for="description" class="font-semibold text-lg pb-2 label-text">Menu Description</label>
        <textarea v-model="form.description"
                  class="py-3 px-2 w-full textarea min-h-16"
                  placeholder="Please type description..."/>
        <span v-if="!validateDescript" @blur="checkDescript" class="text-error">Description required</span>
      </div>
      <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
        <img id="output" width="200">
        <input type="file" name="img" accept="image" id="file" @change="onFileChange($event)"/>
        <span v-if="!validateFile" class="text-error">Image required</span>
      </div>
      <div class="md:col-span-2 md:p-2 md:mr-0 flex flex-row mx-auto pt-5">
        <button type="submit" class="btn md:mx-5 mx-2">Save Form</button>
        <button class="btn btn-primary md:mx-5 mx-2" @click="$router.push('/menu')">Cancel</button>
      </div>
    </form>

  </div>
</template>

<script>
import axios from "axios";
import ErrorPage from '@/components/ErrorPage.vue'
import Swal from 'sweetalert2'
export default {
  name: "MenuForm",
  components: { ErrorPage },
  data() {
    return {
      error:false,
      form: {
        name: "",
        price: 0,
        description: "",
        category: null,
        image: ""
      },
      file: null,
      validateName: true,
      validatePrice: true,
      validateDescript: true,
      validateCategory: true,
      validateFile: true
    }
  },
  methods: {
    submitform() {
      this.checkForm();
      if (!this.validateName || !this.validatePrice || !this.validateDescript || !this.validateCategory) return;
      if (this.$route.params.id != null) this.editMenu();
      if (this.$route.params.id == null) this.addNewMenu();
    },
    checkForm(){
      this.validateName = (this.form.name != "") ? true : false
      this.validateDescript = (this.form.description != "") ? true : false
      this.validatePrice = (this.form.price > 0) ? true : false
      this.validateCategory = (this.form.category != "") ? true : false
      this.validateFile = (this.file != "") ? true : false
    },
    onFileChange(event) {
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      this.file = event.target.files[0];
    },
    async addNewMenu() {
      let newMenu = JSON.stringify(this.form)
      let data = new FormData()
      data.append("menu", newMenu)
      data.append("multipartFile", this.file);
      try {
        await axios.post(`${this.$store.state.backendUrl}/menu/add`, data,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}});
        this.$router.push('/menu');
      } catch (error) {
        if(error.response.status==500){
          Swal.fire({
            icon: 'error',
            title: 'Image is too large ',
            text: 'Please insert another picture',
            footer: `If you don't have any problem, please contract`
          })
        }
        else{
        Swal.fire({
            icon: 'error',
            title: error.response.data,
            footer: `If you don't have any problem, please contract`
          })
        }
      }
    },
    async editMenu() {
      let editMenu = JSON.stringify(this.form)
      let data = new FormData()
      data.append("menu", editMenu)
      data.append("multipartFile", this.file);
        await axios.put(`${this.$store.state.backendUrl}/menu/edit`, data ,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
        .catch(function (error) {
          if(error.response.status==500){
            Swal.fire({
            icon: 'error',
            title: 'Image is too large ',
            text: 'Please insert another picture',
            footer: `If you don't have any problem, please contract`
          })
        }
          else{
            Swal.fire({
            icon: 'error',
            title: error.response.data,
            footer: `If you don't have any problem, please contract`
          })}});
        this.$router.push('/menu');   
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  },
  mounted() {
    if(this.$route.params.id == null) return;
    let tempMenu = this.$store.state.menus.filter(list => {
      return list.id == this.$route.params.id
    })
    this.form = tempMenu[0];
    console.log(typeof this.form)
    if(typeof this.form === 'undefined'){
       this.error =true
       return 
    }
    var image = document.getElementById("output");
    image.src = this.$store.state.backendUrl+this.form.image;
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  }
}
</script>