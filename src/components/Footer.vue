<template>
  <div id="footer">
    <div class="p-10 bg-black text-white flex flex-wrap">
      <!-- Kao Food -->
      <div class="flex-1 md:p-5 p-10">
        <h1 class="xl:text-4xl text-3xl uppercase font-bold">Kaofood</h1>
        <span class="text-gray-400">
          <hr class="xl:w-3/5 w-44" />
          <p class="xl:text-center xl:mr-36 ml-14 xl:text-sm text-xs">Capitalism Restaurant</p>
        </span>
        <p class="py-5"><i class="material-icons"> location_on </i> 99 Bei Chang Jie, Xicheng Qu, Beijing Shi, China</p>
        <p><i class="material-icons">email</i> kaofood@mail.com</p>
        <p class="py-5"><i class="material-icons">call</i> +86 112 2021 2564</p>
      </div>

      <!-- Link -->
      <div class="flex-1 md:p-5 p-10 text-center">
        <h1 class="text-2xl uppercase font-semibold ">Link</h1>
        <hr class="w-1/2 pb-5 mx-auto" />
        <div class="flex flex-col leading-loose uppercase tracking-widest">
          <router-link to="/">Home</router-link>
          <router-link to="">Menu</router-link>
          <router-link to="">Contact</router-link>
        </div>
      </div>

      <!-- Opening Hours -->
      <div class="flex-1 md:p-5 p-10 text-center">
        <h1 class="text-2xl uppercase font-semibold ">Opening Hours</h1>
        <hr class="w-11/12 mx-auto" />
        <div class="text-lg">
          <p class="mt-3">
            <span class="text-fire-lighter font-medium">Mon - Thu:</span> 9AM - 9PM
          </p>
          <p class="mt-3">
            <span class="text-fire-lighter font-medium">Fri - Sat:</span> 10AM - 8PM
          </p>
          <p class="mt-3">
            <span class="text-fire-lighter font-medium">Sun:</span> 10AM - 6PM
          </p>
        </div>
      </div>

      <!-- Social -->
      <div class="flex-1 md:p-5 p-10">
        <h1 class="text-2xl uppercase font-semibold text-center">Social</h1>
        <hr class="w-1/2 mx-auto" />
        <div class="flex flex-row justify-center">
          <!-- Twitter -->
          <a class="p-6 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <!-- Youtube -->
          <a class="p-6 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <!-- Facebook -->
          <a class="p-6 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </div>
        <p class="w-full text-center text-xs">Copyright © 2021 - All right reserved by Capital Kaofood Restautant</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
