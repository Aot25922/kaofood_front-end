<template>
  <div id="menuBar">
    <div class="navbar bg-primary-focus text-neutral-content">
      <!-- Hamburger Dropdown -->
      <div class="dropdown dropdown-right md:hidden">
        <button class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">           
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
          </svg>
        </button>
      <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black">
        <li>
          <router-link to="/">Home</router-link>
        </li> 
        <li>
          <router-link to="/menu">Menu</router-link>
        </li> 
        <li>
          <router-link to="/about">About Us</router-link>
        </li>
        <li>
          <router-link to="/login" v-if="account==null">Login</router-link>
        </li>
        <li>
          <router-link to="/signup" class="mt-10 font-bold" v-if="account==null">Sign Up</router-link>
        </li>
        <li>
          <span @click="logout" v-if="account!=null">Logout</span>
        </li>
      </ul>
      </div>

  <!-- Main menu ipad to laptop -->
  <div class="px-4">
    <img src="../assets/logo.png" class="lg:w-20 md:w-14 lg:pr-2 md:pr-1 md:py-1 w-0"/>
    <div class="md:items-stretch hidden md:block">
      <router-link to="/" class="btn btn-ghost btn-sm rounded-btn md:text-xl">Home</router-link>
      <router-link to="/menu" class="btn btn-ghost btn-sm rounded-btn md:text-xl">Menu</router-link>
      <router-link to="/about" class="btn btn-ghost btn-sm rounded-btn md:text-xl">About Us</router-link>
    </div>
  </div>

  <div class="md:flex ml-auto mx-2">
    <!-- Search -->
    <button class=" btn btn-square btn-ghost">
      <i class="material-icons">search</i>
    </button>

  <!-- Cart -->
    <button class="md:flex btn btn-square btn-ghost">
      <i class="material-icons"> shopping_cart </i>
    </button>

  <!-- Account: Toggle when ipad to laptop -->
  <!-- Login button -->
    <div @click="showLoginMenu = !showLoginMenu" v-if="account==null" class="md:flex hidden dropdown dropdown-end">
        <div tabindex="0" class="btn btn-ghost rounded-btn"><i class="material-icons">account_circle</i></div> 
        <ul  tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black">
          <li>
            <router-link to="/login">Login</router-link>
          </li> 
          <li>
            <router-link to="/signup" class="font-bold">Sign Up</router-link>
          </li> 
        </ul>
    </div>

  <!-- Logout -->
      <div @click="showLogoutMenu = !showLogoutMenu" v-if="account!=null" class="md:flex hidden dropdown dropdown-end"> 
        <div tabindex="0" class="btn btn-ghost rounded-btn"><i class="material-icons">account_circle</i></div> 
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black">
            <li @click="logout">Logout</li>
          </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  inject: ["account"],
  emits: ["logout-account"],
  props: {
    newAccount : null
  },
  data() {
    return {
      showLoginMenu: false,
      showLogoutMenu:false,
      account : this.newAccount
    }
  },
  methods : {
    logout(){
      localStorage.removeItem("account");
      this.$emit("logout-account")
    }
  },
  mounted() {
    if (localStorage.getItem("account")) {
      try {
        this.account = JSON.parse(localStorage.getItem("account"));
        console.log(this.account)
      } catch (e) {
        localStorage.removeItem("account");
        console.log(this.account)
      }
    }
  },
}
</script>