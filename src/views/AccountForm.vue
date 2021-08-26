<template>
  <div class="h-screen bg-blue-700 px-3 py-16">
    <div class="max-w-md mx-auto bg-white p-3 rounded">
      <!-- ส่วนของ Sign Up -->
      <div v-if="mode == 'SignUp'" class="w-full p-3 px-6 py-10">
        <div class="text-center">
          <span class="text-xl text-gray-700">SignUp</span>
        </div>
        <div class="mt-3 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">First name</span>
          <input type="text" class="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"/>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Last name</span>
          <input type="text" class=" h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"/>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Email</span>
          <input type="text" class=" h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"/>
        </div>
        <div class="mt-4 relative">
          <span class="absolute p-1 bottom-8 ml-2 bg-white text-gray-400">Password</span>
          <input type="text" class=" h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600"/>
        </div>
        <div class="mt-4">
          <button class="h-12 w-full bg-red-600 text-white rounded hover:bg-red-700">Click to proceed
            <i class="fa fa-long-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- ส่วนของ login -->
      <div v-else class="px-3 py-5">
        <div class="text-center mb-10">
          <h1 class="text-2xl mb-4">Login</h1>
        </div>
        <div class="relative mb-3">
          <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Email</span>
          <input v-model="email" class="transition duration-500 border h-12 rounded w-full px-2 mb-2"/>
          <span v-if="emptyEmail" class="text-red">Email cannot empty!</span>
        </div>
        <div class="relative mb-1">
          <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Password</span>
          <input v-model="password" class="transition duration-500 border h-12 rounded w-full px-2 mb-2"/>
          <span v-if="emptyPassword" class="text-red">password cannot empty!</span>
        </div>
        <div class="text-right mb-3">
          <a href="#" class="cursor-pointer text-blue-500 hover:text-blue-700">Forgot password?</a>
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
  data() {
    return {
      email: "",
      password: "",
      account: null,
      checkForLogin: false,
      emptyEmail: null,
      emptyPassword: null
    };
  },
  methods: {
    async login() {
      this.checkLoginForm();
      if(this.emptyPasswordl&&this.emptyEmail){
      try {
        const res = await fetch(`http://localhost:3000/user/login/${this.email}/${this.passsword}`);
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
    checkLoginForm(){
      if(this.email!==""){
        this.emptyEmail=false
      }else{
        this.emptyEmail=true
      }
      if(this.password!==""){
        this.emptyPassword=false
      }else{
        this.emptyPassword=true
      }
    },
  },
};
</script>