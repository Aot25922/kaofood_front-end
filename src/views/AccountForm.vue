<template>
  <div class="bg-fire-lightest px-7 py-12">
    <div class="lg:grid lg:grid-cols-3 lg:mt-32 lg:mb-12">
      <img src="../assets/logo.png" class="lg:col-span-1 xl:p-16 lg:p-5 lg:m-auto md:mt-16 my-10 mx-auto lg:w-3/4 md:w-1/4 w-1/3"/>
      <div class="lg:col-span-2 lg:w-full xl:max-w-screen-lg max-w-xl mx-auto bg-white md:px-10 p-3 rounded shadow border-8 border-fire-darker">
        <!-- ส่วนของ Sign Up -->
        <div v-if="mode == 'SignUp'" class="w-full p-3 px-6 py-10">
          <div class="text-center">
            <span class="text-xl uppercase font-semibold">Register a new account</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.firstName"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Firstname"/>
            <span v-if="signUpForm.isFirstNameEmpty" class="text-error">Firstname required</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.lastName"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Lastname"/>
            <span v-if="signUpForm.isLastNameEmpty" class="text-error">Lastname required</span>
          </div>
          <div class="mt-4 ">
            <textarea class="h-24 p-2 w-full outline-none border border-gray-dark rounded focus:outline-none focus:border-gray"
                      placeholder="Your address..." v-model="signUpForm.address"/>
            <span v-if="signUpForm.isAddressEmpty" class="text-error">Address required</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.phone"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Phone"/>
            <span v-if="signUpForm.isPhoneEmpty" class="text-error">Phone required</span>
            <span v-if="signUpForm.accountPhoneExist" class="text-error">Phone already exist!</span>
          </div>
          <div class="mt-4">
            <input type="email" v-model.trim="signUpForm.email"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Email"/>
            <span v-if="signUpForm.isEmailEmpty" class="text-error">Email required</span>
            <span v-if="signUpForm.accountEmailExist" class="text-error">Email already exist!</span>
          </div>
          <div class="mt-4">
            <input type="password" v-model="signUpForm.password"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Password"/>
          </div>
          <div class="mt-4">
            <input type="password" v-model="signUpForm.confirmPassword"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Confirm Password"/>
            <span v-if="signUpForm.isPasswordEmpty" class="text-error">Password required</span>
            <span v-if="signUpForm.passwordNotSame" class="text-error">Password Not Same</span>
          </div>
          <div class="mt-10">
            <button @click="signUp" class="py-3 w-full btn btn-secondary text-white rounded hover:bg-red">
              Sign Up
              <i class="fa fa-long-arrow-right"></i>
            </button>
            <div class="mt-5 lg:text-xs text-2xs text-center">
              <hr class="w-full text-gray lg:py-3 py-2">
            <span>Already have account, please </span><router-link to="/login" class="text-blue underline">LogIn</router-link>
          </div>
          </div>
        </div>

        <!-- ส่วนของ login -->
        <div v-else class="xl:mt-20 md:mb-4 md:px-10 px-3 py-5">
          <div v-if="account != null">
            <span class="text-xl uppercase font-semibold">Login</span>
          </div>
          <div class="mb-3 xl:px-10">
            <input type="email" v-model="loginForm.email"
                   class="transition duration-500 outline-none border-b py-3 rounded w-full px-2 mb-2"
                   placeholder="Email"/>
            <span v-if="loginForm.isEmailEmpty" class="text-error">Email cannot be empty!</span>
          </div>
          <div class="mb-3 xl:px-10">
            <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Password</span>
            <input type="password" v-model="loginForm.password"
                   class="transition duration-500 outline-none border-b py-3 rounded w-full px-2 mb-2"
                   placeholder="Password"/>
            <span v-if="loginForm.isPasswordEmpty" class="text-error">password cannot be empty!</span>
          </div>
          <div class="flex flex-row-reverse xl:px-10 xl:py-5">
            <router-link class="text-blue underline text-sm" to="/signup">Sign Up</router-link>
          </div>
          <div class="xl:px-10">
            <button @click="login" class="py-3 w-full btn btn-primary rounded text-white mt-3">Login</button>
          </div>
          <span v-if="loginForm.isErrorLogin" class="text-error">Your username or password is wrong.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountForm",
  props: ['mode'],
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
        confirmPassword: '',
        isFirstNameEmpty: false,
        isLastNameEmpty: false,
        isAddressEmpty: false,
        isPhoneEmpty: false,
        isEmailEmpty: false,
        isPasswordEmpty: false,
        passwordNotSame: false,
        accountEmailExist: false,
        accountPhoneExist: false
      }
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
      await this.$store.dispatch("getAccount", this.loginForm);
      if (this.$store.state.account == null || this.$store.state.account == '') {
        this.loginForm.isErrorLogin = true;
        return;
      } else {
        this.loginForm.isErrorLogin = false;
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
      this.signUpForm.passwordNotSame = (this.signUpForm.password != this.signUpForm.confirmPassword) ? true : false
    },
    async signUp() {
      this.checkSignUpForm();
      if (this.signUpForm.isFirstNameEmpty || this.signUpForm.isLastNameEmpty || this.signUpForm.isAddressEmpty
          || this.signUpForm.isPhoneEmpty || this.signUpForm.isEmailEmpty || this.signUpForm.isPasswordEmpty ||
          this.signUpForm.passwordNotSame) return;
      let newAccount = JSON.stringify({
        fname : this.signUpForm.firstName,
        lname : this.signUpForm.lastName,
        email : this.signUpForm.email,
        phone : this.signUpForm.phone,
        password : this.signUpForm.password,
        address : this.signUpForm.address,
        role : "Customer"
      })
      await this.$store.dispatch("setNewAccount", newAccount);
      if (this.$store.state.account == 'success') {
        this.signUpForm.accountEmailExist = false;
        this.signUpForm.accountPhoneExist = false;
        this.loginForm.email = this.signUpForm.email
        this.loginForm.password = this.signUpForm.password
        await this.$store.dispatch("getAccount", this.loginForm);
        this.$router.go(-1);
      }
      this.signUpForm.accountEmailExist = (this.$store.state.account == 'accountEmailExist') ? true : false;
      this.signUpForm.accountPhoneExist = (this.$store.state.account == 'accountPhoneExist') ? true : false;
    }
  }
}
</script>