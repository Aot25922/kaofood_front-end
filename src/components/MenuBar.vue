<template>
  <div id="menuBar">
    <div class="navbar bg-primary-focus text-neutral-content">
      <div class="flex-1 px-2 mx-2">
        <div class="items-stretch hidden lg:flex">
          <router-link to="/" class="btn btn-ghost btn-sm rounded-btn text-xl md:text-lg">Home</router-link>
          <router-link to="" class="btn btn-ghost btn-sm rounded-btn text-xl md:text-lg">Menu</router-link>
          <router-link to="" class="btn btn-ghost btn-sm rounded-btn text-xl md:text-lg">Contact</router-link>
        </div>
      </div>

      <div class="flex-1 px-2 mx-2">
        <router-link to="/"><img src="../assets/logo.png" class="w-20"/></router-link>
      </div>

      <div class="flex-none mx-5">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <button class="btn btn-square btn-ghost">
          <i class="material-icons"> shopping_cart </i>
        </button>
        <!-- ปุ่ม Login -->
        <div @click="showLoginMenu = !showLoginMenu" v-if="account==null"> 
          <div class="flex justify-between">
              <i class="material-icons"> account_circle </i>
          </div>
          <div v-if="showLoginMenu" class="mt-2 py-2 bg-white rounded-lg shadow-xl"> 
            <router-link to="/login" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Login</router-link>
            <router-link to="/signup" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Sign Up</router-link>
          </div>
        </div>
        <!-- ปุ่ม Logout -->
        <div @click="showLogoutMenu = !showLogoutMenu" v-if="account!=null"> 
          <div class="flex justify-between">
              <i class="material-icons"> account_circle </i>
          </div>
          <div v-if="showLogoutMenu" class="mt-2 py-2 bg-white rounded-lg shadow-xl"> 
            <span class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" @click="logout">Logout</span>
          </div>
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
  methods : {
    logout(){
      localStorage.removeItem("account");
      this.$emit("logout-account")
    }
  },
}
</script>