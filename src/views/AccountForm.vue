<template>
  <div class="bg-fire-lightest px-7 py-12 flex-grow">
    <div class="lg:grid lg:grid-cols-3 lg:py-12">
      <img src="../assets/logo.png" class="lg:col-span-1 xl:p-16 lg:p-5 lg:m-auto md:mt-16 my-10 mx-auto lg:w-3/4 md:w-1/4 w-1/3"/>
      <div class="lg:col-span-2 lg:w-full xl:max-w-screen-lg max-w-xl mx-auto bg-white md:px-10 p-3 rounded shadow border-8 border-fire-darker">
        <!-- ส่วนของ Sign Up -->
        <div v-if="mode == 'SignUp' || mode == 'Edit'" class="w-full p-3 px-6 py-10">
          <div class="text-center">
            <span class="text-xl uppercase font-semibold label-text">
              <span v-if="mode == 'SignUp'">Register a new account</span>
              <span v-else>Edit Your Account</span>
            </span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.firstName" @keyup.enter="saveForm"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Firstname"/>
            <span v-if="signUpForm.isFirstNameEmpty" class="text-error">Firstname required</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.lastName" @keyup.enter="saveForm"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Lastname"/>
            <span v-if="signUpForm.isLastNameEmpty" class="text-error">Lastname required</span>
          </div>
          <div class="mt-4 ">
            <textarea class="h-24 p-2 w-full outline-none border border-gray-dark rounded focus:outline-none focus:border-gray"
                      placeholder="Your address..." v-model="signUpForm.address" @keyup.enter="saveForm"/>
            <span v-if="signUpForm.isAddressEmpty" class="text-error">Address required</span>
          </div>
          <div class="mt-4">
            <input v-model.trim="signUpForm.phone" @keyup.enter="saveForm"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Phone"/>
            <span v-if="signUpForm.isPhoneEmpty" class="text-error">Phone required</span>
            <span v-if="signUpForm.accountPhoneExist" class="text-error">Phone already exist!</span>
          </div>
          <div class="mt-4">
            <input type="email" v-model.trim="signUpForm.email" @keyup.enter="saveForm"
                   class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                   placeholder="Email"/>
            <span v-if="signUpForm.isEmailEmpty" class="text-error">Email required</span>
            <span v-if="signUpForm.accountEmailExist" class="text-error">Email already exist!</span>
          </div>
          <div v-if="changePass || mode=='SignUp'">
            <div class="mt-4">
              <input type="password" v-model="signUpForm.password" @keyup.enter="saveForm"
                    class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                    placeholder="Password"/>
                <span v-if="signUpForm.isPasswordEmpty" class="text-error">Password required</span>
            </div>
            <div class="mt-4">
              <input type="password" v-model="signUpForm.confirmPassword" @keyup.enter="saveForm"
                    class="py-3 px-2 w-full outline-none border-b border-gray-dark rounded focus:outline-none focus:border-gray"
                    placeholder="Confirm Password"/>         
              <span v-if="signUpForm.passwordNotSame" class="text-error">Password Not Same</span>
            </div>
          </div>
          <div class="mt-10">
            <button @click="saveForm" @keypress.enter="saveForm" class="py-3 w-full btn btn-secondary text-white rounded hover:bg-red">
              <span v-if="mode == 'SignUp'">Sign Up</span>
              <span v-else>Save</span>
            </button>
            <div class="mt-5 lg:text-xs text-2xs text-center">
              <hr class="w-full text-gray lg:py-3 py-2">
            <div v-if="mode == 'SignUp'">
              <span>Already have account, please </span><router-link to="/login" class="text-blue underline">LogIn</router-link>
            </div>
              <button v-if="mode=='Edit'" @click="changePass=!changePass">
                <i class="fas fa-key px-1"></i>
                  <span v-if="!changePass">Change Your Password</span>
                  <span v-else>Not Change My Password</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ส่วนของ login -->
        <div v-else class="xl:mt-10 md:mb-4 md:px-10 px-3 py-5">
          <span class="text-xl block text-center p-2 uppercase font-semibold label-text">Login</span>
          <div class="mb-3 xl:px-10">
            <input type="email" v-model="loginForm.email" @keyup.enter="login"
                   class="transition duration-500 outline-none border-b py-3 rounded w-full px-2 mb-2"
                   placeholder="Email"/>
            <span v-if="loginForm.isEmailEmpty" class="text-error">Email cannot be empty!</span>
          </div>
          <div class="mb-3 xl:px-10">
            <span class="ml-2 bg-white px-2 absolute -top-3 text-sm">Password</span>
            <input type="password" v-model="loginForm.password"  @keyup.enter="login"
                   class="transition duration-500 outline-none border-b py-3 rounded w-full px-2 mb-2"
                   placeholder="Password"/>
            <span v-if="loginForm.isPasswordEmpty" class="text-error">password cannot be empty!</span>
            <span v-if="loginForm.isErrorLogin" class="text-error">Your username or password is wrong.</span>
          </div>
          <div class="flex flex-row-reverse xl:px-10 xl:py-5">
            <router-link class="text-blue underline text-sm" to="/signup">Sign Up</router-link>
          </div>
          <div class="xl:px-10">
            <button @click="login" @keypress.enter="login" class="py-3 w-full btn btn-primary rounded text-white mt-3">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: "AccountForm",
  props: ['mode'],
  data() {
    return {
      changePass: false,
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
      if (!this.validEmail(this.loginForm.email)){
        Swal.fire({
            icon: 'error',
            title: 'Valid Email',
            text: 'Please input you email',
            footer: `If you don't have any account, Please Sign Up first`
          })
          return
      }
      if(this.loginForm.password.length<6){
        Swal.fire({
            icon: 'error',
            title: 'Valid Password',
            text: 'Please input password more than 6 character',
            footer: `If you don't have any account, Please Sign Up first`
          })
          return
      }
      await this.$store.dispatch("getAccount", this.loginForm);
      if (this.$store.state.account == null || this.$store.state.account == '') {
        this.loginForm.isErrorLogin = true;
        {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'Email or Password wrong!',
            footer: `If you don't have any account, Please Sign Up first`
          })
        }
        return;
      } else {
        this.loginForm.isErrorLogin = false;
        this.$router.push("/");
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully Login!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    },
    checkSignUpForm() {
      this.signUpForm.isFirstNameEmpty = (this.signUpForm.firstName == "") ? true : false
      this.signUpForm.isLastNameEmpty = (this.signUpForm.lastName == "") ? true : false
      this.signUpForm.isAddressEmpty = (this.signUpForm.address == "") ? true : false
      this.signUpForm.isPhoneEmpty = (this.signUpForm.phone == "") ? true : false
      this.signUpForm.isEmailEmpty = (this.signUpForm.email == "") ? true : false
      if (this.signUpForm.password == '') {
        this.signUpForm.isPasswordEmpty = true
      }else { 
        this.signUpForm.isPasswordEmpty = false 
      }
      this.signUpForm.passwordNotSame = (this.signUpForm.password != this.signUpForm.confirmPassword) ? true : false
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkEditForm(){
      this.signUpForm.isFirstNameEmpty = (this.signUpForm.firstName == "") ? true : false
      this.signUpForm.isLastNameEmpty = (this.signUpForm.lastName == "") ? true : false
      this.signUpForm.isAddressEmpty = (this.signUpForm.address == "") ? true : false
      this.signUpForm.isPhoneEmpty = (this.signUpForm.phone == "") ? true : false
      this.signUpForm.isEmailEmpty = (this.signUpForm.email == "") ? true : false
      if(this.changePass==true) {
        this.signUpForm.isPasswordEmpty = (this.signUpForm.password == "") ? true : false
        this.signUpForm.passwordNotSame = (this.signUpForm.password != this.signUpForm.confirmPassword) ? true : false
      }
    },
    async signUp() {
      this.checkSignUpForm();
      if (this.signUpForm.isFirstNameEmpty || this.signUpForm.isLastNameEmpty || this.signUpForm.isAddressEmpty
          || this.signUpForm.isPhoneEmpty || this.signUpForm.isEmailEmpty || this.signUpForm.isPasswordEmpty ||
          this.signUpForm.passwordNotSame) return;
      if (!this.validEmail(this.signUpForm.email)){
        Swal.fire({
            icon: 'error',
            title: 'Valid Email',
            text: 'Please input you email',
            footer: `If you don't have any account, Please Sign Up first`
          })
          return
      }
      if(this.signUpForm.password.length<6){
        Swal.fire({
            icon: 'error',
            title: 'Valid Password',
            text: 'Please input password more than 6 character',
            footer: `If you don't have any account, Please Sign Up first`
          })
          return
      }
      let newAccount = JSON.stringify({
        fname : this.signUpForm.firstName,
        lname : this.signUpForm.lastName,
        email : this.signUpForm.email,
        phone : this.signUpForm.phone,
        password : this.signUpForm.password,
        address : this.signUpForm.address,
        role : {'id':3,'name':'Member'}
      })
      await this.$store.dispatch("setNewAccount", newAccount);
      if (this.$store.state.account == 'success') {
        this.signUpForm.accountEmailExist = false;
        this.signUpForm.accountPhoneExist = false;
        this.loginForm.email = this.signUpForm.email
        this.loginForm.password = this.signUpForm.password
        await this.$store.dispatch("getAccount", this.loginForm);
        this.$router.push("/");
        {
          Swal.fire({
            icon: 'success',
            title: 'SignUp Complete!',
            text: `Let's order food that you wanted`,
          })
        }
      }
      this.signUpForm.accountEmailExist = (this.$store.state.account == 'accountEmailExist') ? true : false;
      this.signUpForm.accountPhoneExist = (this.$store.state.account == 'accountPhoneExist') ? true : false;
    },
    saveForm() {
      if(this.$route.params.id != null) this.editAccount();
      if(this.$route.params.id == null) this.signUp();

    },
    async editAccount() {
      this.checkEditForm();
      if (this.signUpForm.isFirstNameEmpty || this.signUpForm.isLastNameEmpty || this.signUpForm.isAddressEmpty
        || this.signUpForm.isPhoneEmpty || this.signUpForm.isEmailEmpty || this.signUpForm.isPasswordEmpty ||
        this.signUpForm.passwordNotSame) return;
        if (!this.validEmail(this.signUpForm.email)){
        Swal.fire({
            icon: 'error',
            title: 'Valid Email',
            text: 'Please input you email',
            footer: `If you don't have any account, Please Sign Up first`
          })
          return
      }
      const axios = require('axios');
      let editAccount = JSON.stringify({
        fname : this.signUpForm.firstName,
        lname : this.signUpForm.lastName,
        email : this.signUpForm.email,
        phone : this.signUpForm.phone,
        address : this.signUpForm.address,
        password: this.signUpForm.password
      })
      let data = new FormData()
      data.append("account", editAccount)
       try {
        await axios.put(`${this.$store.state.backendUrl}/user/edit/profile`, data, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}});
        this.$store.dispatch("fetchLocalStorage")
        {
          Swal.fire({
            icon: 'success',
            title: 'Successfully',
          })
        }
        this.$router.push('/')
      } catch(error) {
        Swal.fire({
            icon: 'error',
            title: error.response.data,
            footer: `If you don't have any account, Please Sign Up first`
          })
      }
     },
  },
  mounted() {
    if(this.mode == 'Edit') {
      let account = this.$store.state.account
      this.signUpForm.firstName = account.fname
      this.signUpForm.lastName = account.lname
      this.signUpForm.email = account.email
      this.signUpForm.phone = account.phone
      this.signUpForm.address = account.address
      this.signUpForm.password = ""
    }
  },
}
</script>