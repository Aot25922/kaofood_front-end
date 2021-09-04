<template>
  <div id="FoodList">
      <div class="relative">
        <img class="rounded w-full xl:h-80 h-56 object-cover" :src="menuUrl+menu.image">
        <span class="font-medium absolute bottom-0 left-0 rounded bg-primary md:text-2xl text-xl p-1">{{ menu.price }} ฿</span>
      </div>
      <div class="card-body">
        <h2 class="card-title xl:text-2xl lg:text-xl md:text-lg text-base">{{ menu.name }}
          <!-- <div class="badge mx-2 badge-secondary lg:text-xl md:text-lg lg:py-4 md:p-3 ">NEW</div> -->
        </h2>
        <!-- <p class="truncate">&emsp;{{ menu.description }}</p> -->
        <div v-if="account()!=null&&account().role=='Admin'">
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div class="justify-center card-actions" v-else>
          <button class="btn btn-secondary w-full uppercase xl:text-xl lg:text-lg md:text-base text-sm">Add to Cart
          </button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "FoodList",
  props: ['menu'],
  inject: ["menuUrl", "account"],
};
</script>