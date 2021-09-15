<template>
  <div id="form" class="lg:px-16 md:px-10 py-5 px-6 alert alert-warning">
    <!-- No permission display -->
    <div v-if="account==null||account.role!='Admin'" class=" lg:mt-28 md:mt-24 mt-20 w-full">
      <div class="text-center mx-auto text-yellow font-bold">
        <i class="fas fa-exclamation-circle p-3 md:text-6xl text-5xl"></i> 
        <p class="md:text-xl text-lg p-3">You haven't permission to get this page!</p>
        <img src="@/assets/nopermission.gif" class="rounded-md my-5">
      </div>
    </div>

    <form v-else @submit.prevent="submitform()" class="bg-salmon w-full text-black card p-5 lg:mt-32 md:mt-24 mt-20 mb-5 md:grid md:grid-cols-2">
      <div class="mt-4 flex flex-col md:p-2">
        <label for="menuName" class="font-semibold text-lg pb-2">Menu name</label>
        <input v-model.trim="form.name"
               class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray"
               placeholder="Please enter Menu name..."/>
        <span v-if="!validateName" @blur="checkName" class="text-error">Name required</span>
      </div>
      <div class="mt-4 flex flex-col md:p-2">
        <label for="category" class="font-semibold text-lg pb-2">Category</label>
        <select id="category" v-model="form.category" name="category"
                class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray">
          <option value="" disabled select class="font-semibold">-- Please select one --</option>
          <option :value="category" v-for="category in this.$store.state.categories" :key="category.id">{{ category.name }}</option>
        </select>
        <span v-if="!validateCategory" @blur="checkCategory" class="text-error">Category required</span>
      </div>
      <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
        <label for="category" class="font-semibold text-lg pb-2">Price</label>
        <input v-model="form.price"
               class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray md:w-1/2"
               placeholder="Price"/>
        <span v-if="!validatePrice" @blur="checkPrice" class="text-error">Price required</span>
      </div>
      <div class="md:col-span-2 md:p-2 mt-4 flex flex-col">
        <label for="description" class="font-semibold text-lg pb-2">Menu Description</label>
        <textarea v-model="form.description" rows="5"
                  class="py-3 px-2 w-full outline-none border-0 rounded focus:outline-none focus:border-gray"
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
export default {
  name: "MenuForm",
  data() {
    return {
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
      const axios = require('axios');
      let newMenu = JSON.stringify(this.form)
      let data = new FormData()
      data.append("menu", newMenu)
      data.append("multipartFile", this.file);
      try {
        await axios.post(`${this.$store.state.backendUrl}/menu/add`, data);
        this.$router.push('/menu');
      } catch (error) {
        console.log(`Counld not get! ${error}`);
      }
    },
    async editMenu() {
      const axios = require('axios');
      let editMenu = JSON.stringify(this.form)
      let data = new FormData()
      data.append("menu", editMenu)
      data.append("multipartFile", this.file);
      try {
        await axios.put(`${this.$store.state.backendUrl}/menu/edit`, data);
        this.$router.push('/menu');
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    if(this.$route.params.id == null) return;
    let tempMenu = this.$store.state.menus.filter(list => {
      return list.id == this.$route.params.id
    })
    this.form = tempMenu[0];
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  }
}
</script>