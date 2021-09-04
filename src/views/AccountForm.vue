<template>
  <div class="bg-fire-lightest lg:pt-80 lg:pb-96 md:pb-48 px-3 py-20">
    <div class="lg:grid lg:grid-cols-3 lg:mt-44">
      <img src="../assets/logo.png" class="lg:col-span-1 lg:m-auto md:mt-28 my-10 mx-auto lg:w-3/4 md:w-1/4 w-1/3"/>
      <div
          class="lg:col-span-2 lg:w-full xl:max-w-screen-lg max-w-xl mx-auto bg-white p-3 rounded shadow border-8 border-fire-darker">
        <!-- ส่วนของ Sign Up -->
        <div v-if="mode == 'SignUp'" class="w-full p-3 px-6 py-10">
          <div class="text-center">
            <span class="text-xl uppercase font-semibold">Register a new account</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.firstName"
                   class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600"
                   placeholder="Firstname"/>
            <span v-if="signUpForm.isFirstNameEmpty" class="text-error">Firstname required</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.lastName"
                   class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600"
                   placeholder="Lastname"/>
            <span v-if="signUpForm.isLastNameEmpty" class="text-error">Lastname required</span>
          </div>
          <div class="mt-4 ">
            <textarea class="h-24 p-2 w-full outline-none border rounded focus:outline-none focus:border-gray-600"
                      placeholder="Your address..." v-model="signUpForm.address"/>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.phone"
                   class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600"
                   placeholder="Phone"/>
            <span v-if="signUpForm.isPhoneEmpty" class="text-error">Phone required</span>
            <span v-if="signUpForm.accountPhoneExist" class="text-error">Phone already exist!</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.email"
                   class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600"
                   placeholder="Email"/>
            <span v-if="signUpForm.isEmailEmpty" class="text-error">Email required</span>
            <span v-if="signUpForm.accountEmailExist" class="text-error">Email already exist!</span>
          </div>
          <div class="mt-4">
            <input v-model="signUpForm.password"
                   class="h-12 px-2 w-full outline-none border-b rounded focus:outline-none focus:border-gray-600"
                   placeholder="Password"/>
            <span v-if="signUpForm.isPasswordEmpty" class="text-error">Password required</span>
          </div>
          <div class="mt-4">
            <button @click="signUp" class="h-12 w-full btn btn-secondary text-white rounded hover:bg-red-700">
              Sign Up
              <i class="fa fa-long-arrow-right"></i>
            </button>
          </div>
        </div>

        <!-- ส่วนของ login -->
        <div v-else class="xl:mt-20 xl:px-10 px-3 py-5">
          <div v-if="account != null">
            <span class="text-xl uppercase font-semibold">Login</span>
          </div>
          <div class="mb-3">
            <input type="email" v-model="loginForm.email"
                   class="transition duration-500 outline-none border-b h-12 rounded w-full px-2 mb-2"
                   placeholder="Email"/>
            <span v-if="loginForm.isEmailEmpty" class="text-error">Email cannot be empty!</span>
          </div>
          <div class="mb-3">
            <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Password</span>
            <input type="password" v-model="loginForm.password"
                   class="transition duration-500 outline-none border-b h-12 rounded w-full px-2 mb-2"
                   placeholder="Password"/>
            <span v-if="loginForm.isPasswordEmpty" class="text-error">password cannot be empty!</span>
          </div>
          <div class="flex flex-row-reverse">
            <router-link class="text-blue-500 underline text-sm" to="/signup">Sign Up</router-link>
          </div>
          <button @click="login" class="h-12 w-full btn btn-primary rounded text-white mt-3">Login</button>
          <span v-if="loginForm.isErrorLogin" class="text-error">Your username or password is wrong.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountForm",
  props: ["mode"],
  emits: ["reload-menu"],
  inject: ["userUrl", "account"],
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        isEmailEmpty: false,
        isPasswordEmpty: false,
        isErrorLogin: false,
      },
      signUpForm: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        isFirstNameEmpty: false,
        isLastNameEmpty: false,
        isAddressEmpty: false,
        isPhoneEmpty: false,
        isEmailEmpty: false,
        isPasswordEmpty: false,
      },
      account: null,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      checkForLogin: false,
      checkSignUp: false,
      emptyFirstName: false,
      emptyLastName: false,
      emptyPhone: false,

      accountEmailExist: false,
      accountPhoneExist: false
    };
  },
  methods: {
    checkLoginForm() {
      this.loginForm.isEmailEmpty = (this.loginForm.email == "") ? true : false
      this.loginForm.isPasswordEmpty = (this.loginForm.password == "") ? true : false
    },
    async login() {
      this.checkLoginForm();
      if (this.loginForm.isEmailEmpty || this.loginForm.isPasswordEmpty) return;
      await this.$store.dispatch("getAccount", this.loginForm)
      if (this.$store.state.account == null) {
        this.isErrorLogin = true;
        return;
      } else {
        this.isErrorLogin = false;
        this.$router.go(-1);
      }
    },
    checkSignUpForm() {
      this.signUpForm.isFirstNameEmpty = (this.signUpForm.firstName == "") ? true : false
      this.signUpForm.isLastNameEmpty = (this.signUpForm.lastName == "") ? true : false
      this.signUpForm.isAddressEmpty = (this.signUpForm.address == "") ? true : false
      this.signUpForm.isPhoneEmpty = (this.signUpForm.phone == "") ? true : false
      this.signUpForm.isEmailEmpty = (this.signUpForm.email == "") ? true : false
      this.signUpForm.isPasswordEmpty = (this.signUpForm.password == "") ? true : false
    },
    async signUp() {
      this.checkSignUpForm();
      if (this.signUpForm.isFirstNameEmpty || this.signUpForm.isLastNameEmpty || this.signUpForm.isAddressEmpty
          || this.signUpForm.isPhoneEmpty || this.signUpForm.isEmailEmpty || this.signUpForm.isPasswordEmpty) return;

    }
    //   async signUp() {
    //     this.checkSignUpForm();
    //     if (!(
    //       this.emptyFirstName &&
    //       this.emptyLastName &&
    //       this.emptyPhone &&
    //       this.emptyEmail &&
    //       this.emptyPassword
    //     )) {
    //       let newAccount = JSON.stringify({
    //         email : this.email,
    //         password : this.password,
    //         fname : this.firstName,
    //         lname : this.lastName,
    //         phone : this.phone,
    //         address : this.address,
    //         role : "Customer"
    //       })
    //       let data = new FormData();
    //       data.append("account",newAccount)
    //       try {
    //         const res = await fetch(`${this.userUrl}/signup`,{
    //         method: "POST",
    //         body: data,
    //       });
    //         const checkAccount = await res.text();
    //         console.log(checkAccount)
    //         if(checkAccount == "accountEmailExist"){
    //           this.accountEmailExist = true
    //         }
    //         if(checkAccount == "accountPhoneExist"){
    //           console.log("phone")
    //           this.accountPhoneExist = true
    //         }
    //         if(checkAccount == "success"){
    //           this.accountEmailExist =false
    //           this.accountPhoneExist=false
    //         }
    //       } catch (error) {
    //         console.log(`Counld not get! ${error}`);
    //       }
    //     }
    //   },
    //   checkSignUpForm() {
    //     // check firstName
    //     if (this.firstName !== "") {
    //       this.emptyFirstName = false;
    //     } else {
    //       this.emptyFirstName = true;
    //     }
    //     // check lastName
    //     if (this.lastName !== "") {
    //       this.emptyLastName = false;
    //     } else {
    //       this.emptyLastName = true;
    //     }
    //     // check email
    //     if (this.email !== "") {
    //       this.emptyEmail = false;
    //     } else {
    //       this.emptyEmail = true;
    //     }
    //     // check password
    //     if (this.password !== "") {
    //       this.emptyPassword = false;
    //     } else {
    //       this.emptyPassword = true;
    //     }
    //     // check phone
    //     if (this.phone !== "") {
    //       this.emptyPhone = false;
    //     } else {
    //       this.emptyPhone = true;
    //     }
    //   },
    // },
    // mounted() {
    //   if (localStorage.getItem("account")) {
    //     try {
    //       this.account = JSON.parse(localStorage.getItem("account"));
    //     } catch (e) {
    //       localStorage.removeItem("account");
    //     }
    //   }
  }
}
</script>