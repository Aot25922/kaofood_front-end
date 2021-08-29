<template>
  <div class="h-screen bg-fire-lightest px-3 py-10">
    <div class="max-w-md mx-auto bg-white p-3 rounded">
      <!-- ส่วนของ Sign Up -->
      <div v-if="mode == 'SignUp'" class="w-full p-3 px-6 py-10">
        <div class="text-center">
          <span class="text-xl uppercase">Register a new account</span>
        </div>
        <div class="mt-3 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">First name</span>
          <input v-model.trim="firstName" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-gray-600"/>
          <span v-if="emptyFirstName" class="text-error">Firstname required</span>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Last name</span>
          <input v-model.trim="lastName" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-gray-600"/>
          <span v-if="emptyLastName" class="text-error">Lastname required</span>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Phone</span>
          <input v-model.trim="phone" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-gray-600"/>
          <span v-if="emptyPhone" class="text-error">Phone required</span>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Email</span>
          <input v-model.trim="email" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-gray-600"/>
          <span v-if="emptyEmail" class="text-error">Email required</span>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Password</span>
          <input v-model="password" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-gray-600"/>
          <span v-if="emptyPassword" class="text-error">Password required</span>
        </div>
        <!-- Textarea still has bug -->
        <div class="mt-4 relative">
          <textarea class="h-24 p-2 w-full border-2 rounded focus:outline-none focus:border-gray-600" placeholder="Your address..."/>
        </div>
        <div class="mt-4">
          <button @click="signUp" class="h-12 w-full bg-red-600 text-white rounded hover:bg-red-700">Sign Up
            <i class="fa fa-long-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- ส่วนของ login -->
      <div v-else class="px-3 py-5">
        <div v-if="account!=null" class="text-center mb-10">
          <h1 class="text-2xl mb-4">Login</h1>
        </div>
        <div class="relative mb-3">
          <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Email</span>
          <input type="email" v-model="email" class="transition duration-500 border h-12 rounded w-full px-2 mb-2"/>
          <span v-if="emptyEmail" class="text-error">Email cannot be empty!</span>
        </div>
        <div class="relative mb-1">
          <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Password</span>
          <input type="password" v-model="password" class="transition duration-500 border h-12 rounded w-full px-2 mb-2"/>
          <span v-if="emptyPassword" class="text-error">password cannot be empty!</span>
        </div>
        <div class="flex flex-row mb-3">
          <a href="#" class="flex-1 cursor-pointer text-blue-500 hover:text-blue-700">Forgot password?</a>
          <router-link class="flex-none text-neutral-focus underline" to="/signup">Sign Up</router-link>
        </div>
        <button @click="login" class=" h-12 w-full hover:bg-red-800 focus:outline-none bg-red-700 rounded text-white mb-3">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountForm",
  props: ["mode"],
  inject: ["userUrl"],
  data() {
    return {
      account:null,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      checkForLogin: false,
      checkSignUp: false,
      emptyFirstName: null,
      emptyLastName: null,
      emptyPhone: null,
      emptyEmail: null,
      emptyPassword: null
    };
  },
  methods: {
    async login() {
      this.checkLoginForm();
      if(!(this.emptyPassword&&this.emptyEmail)){
      try {
        const res = await fetch(`${this.userUrl}/${this.email}/${this.password}`);
        const data = res.json();
        this.account = await data;
         if(this.account==null){
           this.checkForLogin = false
         }
         else{
           console.log(this.account)
           const parsed = JSON.stringify(this.account);
           localStorage.setItem('account', parsed);
         }
      } catch (error) {
        console.log(`Counld not get! ${error}`);
      }
      }
    },
    checkLoginForm(){
      if(this.email !== ""){
        this.emptyEmail = false
      }else{
        this.emptyEmail = true
      }
      if(this.password !== ""){
        this.emptyPassword = false
      }else{
        this.emptyPassword = true
      }
    },
    async signUp(){
      this.checkSignUpForm();
      if(this.emptyFirstName && this.lastName && this.emptyPhone && this.emptyEmail && this.emptyPassword) {
        try{
          const res = await fetch(`${this.userUrl}/user`);
          const data = res.json();
          this.account = await data;
         if(this.account==false){
           this.checkForLogin = false
         }
        } catch (error) {
          console.log(`Counld not get! ${error}`);
        }
      }
    },
    checkSignUpForm(){
      // check firstName
      if(this.firstName !== "") {
        this.emptyFirstName = false
      } else {
        this.emptyFirstName = true
      }
      // check lastName
      if(this.lastName !== "") {
        this.emptyLastName = false
      } else {
        this.emptyLastName = true
      }
      // check email
      if(this.email !== ""){
        this.emptyEmail=false
      }else{
        this.emptyEmail=true
      }
      // check password
      if(this.password !== ""){
        this.emptyPassword = false
      }else{
        this.emptyPassword = true
      }
      // check phone
      if(this.phone !== ""){
        this.emptyPhone = false
      }else{
        this.emptyPhone = true
      }
    }
  },
  mounted() {
    if (localStorage.getItem('account')) {
      try {
        this.account = JSON.parse(localStorage.getItem('account'));
      } catch(e) {
        localStorage.removeItem('account');
      }
    }
  }
}
</script>