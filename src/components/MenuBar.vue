<template>
  <div id="btn btn-ghost btn-sm rounded-btn xl:text-xl text-lg">
    <div class="navbar bg-primary-focus text-neutral-content fixed z-50 w-full top-0">
      <!-- Hamburger Dropdown -->
      <div class="dropdown dropdown-right md:hidden">
        <div tabindex="0" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="inline-block w-6 h-6 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/menu">Menu</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
          <li>
            <router-link to="/login" v-if="account==null">Login</router-link>
          </li>
          <li>
            <router-link to="/signup" class="mt-10 font-bold" v-if="account==null">Sign Up</router-link>
          </li>
          <!-- When login will toggle by permission -->
          <div v-if="account!=null">
            <li class="mt-5 px-5 font-bold">{{ account.fname }} {{ account.lname.slice(0,1) }}.</li>
            <li><router-link :to="{ name:'EditAccount', params: { id : account } }">Edit Account</router-link></li>
            <li v-if="this.$store.state.account.role=='Admin'">
              <router-link to="/accountManage" class="w-full">Account Manage</router-link>
            </li>
            <li v-if="this.$store.state.account.role!='Member'">
              <router-link to="/orderManage" class="w-full">Order Manage</router-link>
            </li>
            <li v-if="this.$store.state.account.role=='Member'">
              <router-link to="/cart" class="mx-auto w-full">My Order</router-link>
            </li>
          </div>
          <li><span @click="logout" v-if="account!=null" class="font-bold">Logout</span></li>
        </ul>
      </div>

      <!-- Main menu ipad to laptop -->
      <div class="px-4">
        <img src="../assets/logo.png" class="lg:w-20 md:w-14 w-0 lg:pr-2 md:pr-1 md:py-1"/>
        <div class="md:items-stretch hidden md:block">
          <router-link to="/" class="btn btn-ghost btn-sm rounded-btn xl:text-xl text-lg">Home</router-link>
          <router-link to="/menu" class="btn btn-ghost btn-sm rounded-btn xl:text-xl text-lg">Menu</router-link>
          <router-link to="/contact" class="btn btn-ghost btn-sm rounded-btn xl:text-xl text-lg">Contact</router-link>
        </div>
      </div>
      <div class="md:flex ml-auto mx-2">
        <!-- Search -->
        <button class=" btn btn-square btn-ghost">
          <i class="material-icons">search</i>
        </button>

        <!-- Cart -->
        <router-link to="/cart" class="mx-auto">
          <button class="md:flex btn btn-square btn-ghost">
            <i class="material-icons"> shopping_cart </i>
          </button>
        </router-link>
        <!-- Account: Toggle when ipad to laptop -->
        <!-- Logout&Ordering -->
        <div v-if="account!=null" class="md:flex hidden dropdown dropdown-end">
          <!-- <div tabindex="0" class="btn btn-ghost rounded-btn md:hidden w-14 px-3"><img src="../assets/user.png"></div> -->
          <div tabindex="0" class="btn btn-ghost rounded-btn">{{ account.fname }} {{ account.lname.slice(0,1) }}.</div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black">
            <li><router-link :to="{ name:'EditAccount', params: { id : account.id } }">Edit Account</router-link></li>
            <li v-if="this.$store.state.account.role=='Admin'">
              <router-link to="/accountManage" class="w-full">Account Manage</router-link>
            </li>
            <li v-if="this.$store.state.account.role!='Member'">
              <router-link to="/orderManage" class="w-full">Order Manage</router-link>
            </li>
            <li v-if="this.$store.state.account.role=='Member'">
              <router-link to="/cart" class="mx-auto w-full">My Order</router-link>
            </li>
            <li @click="logout" class="btn btn-ghost font-bold">Logout</li>
          </ul>
        </div>
        <!-- Login button -->
        <div v-else class="md:flex hidden dropdown dropdown-end">
          <div tabindex="0" class="btn btn-ghost rounded-btn"><i class="material-icons">account_circle</i></div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black">
            <li>
              <router-link to="/login">Login</router-link>
            </li>
            <li>
              <router-link to="/signup" class="font-bold">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  methods: {
    logout() {
      this.$store.dispatch("getAccount", null);
      this.$router.push("/");
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  }
};
</script>