<template>
  <div id="app">
    <div class="navbar bg-pink-800 text-neutral-content mb-2">
      <div class="flex-1 px-2 mx-2">
        <div class="items-stretch hidden  lg:flex">
          <router-link to="/" class="btn btn-ghost btn-sm rounded-btn text-xl md:text-lg"> Home </router-link>
          <a class="btn btn-ghost btn-sm rounded-btn"> Portfolio </a>
          <a class="btn btn-ghost btn-sm rounded-btn"> About </a>
          <a class="btn btn-ghost btn-sm rounded-btn"> Contact </a>
        </div>
      </div>

      <div class="flex-1 px-2 mx-2">
        <router-link to="/">
          <img src="./assets/logo.png" class="w-20" /></router-link>
      </div>

      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
        <i class="material-icons"> shopping_cart </i>
        </button>
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <div class="avatar">
          <div class="rounded-full w-10 h-10 m-1">
            <img src="https://i.pravatar.cc/500?img=32" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
};
</script>